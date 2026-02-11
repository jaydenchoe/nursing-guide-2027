import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src/content");

// Korean filename → ASCII slug mapping for Vercel CDN compatibility
const slugMap: Record<string, string> = {
  // 4년제 대학 - 서울
  "가톨릭대학교_간호학과": "catholic-univ",
  "강서대학교_케이씨대학교_간호학과": "gangseo-kc-univ",
  "경희대학교_간호학과": "kyunghee-univ",
  "고려대학교_간호학과": "korea-univ",
  "삼육대학교_간호학과": "sahmyook-univ",
  "서울대학교_간호대학": "seoul-national-univ",
  "성신여자대학교_간호학과": "sungshin-univ",
  "연세대학교_간호대학": "yonsei-univ",
  "이화여자대학교_간호학부": "ewha-univ",
  "중앙대학교_간호학과": "chungang-univ",
  "한국성서대학교_간호학과": "korean-bible-univ",
  "한양대학교_간호학과": "hanyang-univ",
  // 4년제 대학 - 경기/인천
  "가천대학교_간호학과": "gachon-univ",
  "대진대학교_간호학과": "daejin-univ",
  "수원대학교_간호학과": "suwon-univ",
  "신한대학교_간호학과": "shinhan-univ",
  "아주대학교_간호학과": "ajou-univ",
  "을지대학교_간호학과_부천": "eulji-univ-bucheon",
  "을지대학교_간호학과_성남": "eulji-univ-seongnam",
  "인천가톨릭대학교_간호학과": "incheon-catholic-univ",
  "인하대학교_간호학과": "inha-univ",
  "차의과학대학교_간호학과": "cha-univ",
  "한세대학교_간호학과": "hansei-univ",
  // 전문대학 - 서울
  "삼육보건대학교_간호학과": "sahmyook-health-college",
  "서울여자간호대학교_간호학과": "seoul-women-nursing-college",
  "서일대학교_간호학과": "seoil-college",
  // 전문대학 - 경기/인천
  "경민대학교_간호학과": "kyungmin-college",
  "경복대학교_간호학과": "kyungbok-college",
  "경인여자대학교_간호학과": "kyungin-women-college",
  "국제대학교_간호학과": "kukje-college",
  "동남보건대학교_간호학과": "dongnam-health-college",
  "두원공과대학교_간호학과_안성": "doowon-college-anseong",
  "두원공과대학교_간호학과_파주": "doowon-college-paju",
  "부천대학교_간호학과": "bucheon-college",
  "서영대학교_간호학과_파주": "seoyoung-college-paju",
  "서정대학교_간호학과": "seojeong-college",
  "수원과학대학교_간호학과": "suwon-science-college",
  "수원여자대학교_간호학과": "suwon-women-college",
  "안산대학교_간호학과": "ansan-college",
  "여주대학교_간호학과": "yeoju-college",
  "연성대학교_간호학과": "yeonsung-college",
  "용인예술과학대학교_간호학과": "yongin-arts-science-college",
  "인천재능대학교_간호학과": "incheon-jaenung-college",
  "화성의과학대학교_간호학과": "hwaseong-medi-science-college",
};

export interface University {
  slug: string;
  name: string;
  type: "4년제" | "전문대학";
  region: "서울" | "경기_인천";
  content: string;
  capacity?: number;
  hospital?: string;
  recommendation?: string;
  gsiSupport?: string;
}

function extractField(content: string, label: string): string | undefined {
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.includes(label)) {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 3) return parts[2];
    }
  }
  return undefined;
}

function extractRecommendation(content: string): string | undefined {
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.includes("추천 등급")) {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 3) return parts[2];
    }
  }
  return undefined;
}

export function getAllUniversities(): University[] {
  const universities: University[] = [];

  const categories = [
    { dir: "4년제_대학", type: "4년제" as const },
    { dir: "전문대학", type: "전문대학" as const },
  ];

  const regions = [
    { dir: "서울", region: "서울" as const },
    { dir: "경기_인천", region: "경기_인천" as const },
  ];

  for (const cat of categories) {
    for (const reg of regions) {
      const dirPath = path.join(contentDir, cat.dir, reg.dir);
      if (!fs.existsSync(dirPath)) continue;

      const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
        const koreanSlug = file.replace(".md", "");
        const slug = slugMap[koreanSlug] || koreanSlug;
        const nameMatch = content.match(/^# (.+)/m);
        const name = nameMatch
          ? nameMatch[1]
              .replace(" 입시 요강 (2027학년도)", "")
              .replace(" 입시 요강(2027학년도)", "")
          : slug.replace(/_/g, " ");

        const capacityStr = extractField(content, "간호학과 정원");
        const capacity = capacityStr
          ? parseInt(capacityStr.replace(/[^0-9]/g, ""))
          : undefined;

        const hospital = extractField(content, "병원 연계");
        const recommendation = extractRecommendation(content);

        universities.push({
          slug,
          name,
          type: cat.type,
          region: reg.region,
          content,
          capacity,
          hospital,
          recommendation,
        });
      }
    }
  }

  return universities.sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

export function getUniversityBySlug(slug: string): University | undefined {
  return getAllUniversities().find((u) => u.slug === slug);
}

export function getReadme(type?: "4년제_대학" | "전문대학"): string {
  if (type) {
    return fs.readFileSync(path.join(contentDir, type, "README.md"), "utf-8");
  }
  return fs.readFileSync(path.join(contentDir, "README.md"), "utf-8");
}

export function getStrategy(): string {
  return fs.readFileSync(
    path.join(contentDir, "최적_입시_전략.md"),
    "utf-8"
  );
}
