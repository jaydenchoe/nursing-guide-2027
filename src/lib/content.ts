import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src/content");

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
        const slug = file.replace(".md", "");
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
