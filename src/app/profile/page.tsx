import { getStudentProfile } from "@/lib/content";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";

export const metadata = {
  title: "유민이 프로필 - 간호학과 입시 가이드",
};

export default function ProfilePage() {
  const content = getStudentProfile();

  return (
    <div>
      <div className="mb-4">
        <Link href="/" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
          ← 홈으로
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
