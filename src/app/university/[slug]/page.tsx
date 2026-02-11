import { getAllUniversities, getUniversityBySlug } from "@/lib/content";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const universities = getAllUniversities();
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return { title: "Not Found" };
  return {
    title: `${uni.name} - 간호학과 입시 가이드`,
  };
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);

  if (!uni) {
    notFound();
  }

  const typeLabel = uni.type === "4년제" ? "4년제 대학" : "전문대학";
  const regionLabel = uni.region === "서울" ? "서울" : "경기/인천";

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm">
        <Link href="/" className="text-emerald-600 hover:text-emerald-700 transition-colors">
          홈
        </Link>
        <span className="text-slate-300">/</span>
        <Link
          href={uni.type === "4년제" ? "/overview/4year" : "/overview/college"}
          className="text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {typeLabel}
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500">{regionLabel}</span>
      </div>

      {/* Quick Info Bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          uni.type === "4년제" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
        }`}>
          {typeLabel}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          {regionLabel}
        </span>
        {uni.capacity && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
            정원 {uni.capacity}명
          </span>
        )}
        {uni.recommendation && (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            uni.recommendation.includes("도전")
              ? "bg-red-100 text-red-700"
              : uni.recommendation.includes("적정")
              ? "bg-yellow-100 text-yellow-700"
              : uni.recommendation.includes("안전")
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}>
            {uni.recommendation}
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <MarkdownRenderer content={uni.content} />
      </div>
    </div>
  );
}
