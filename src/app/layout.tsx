import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getAllUniversities } from "@/lib/content";

export const metadata: Metadata = {
  title: "간호학과 입시 가이드 2027",
  description:
    "서울/수도권 간호학과 입시 종합 가이드 - 검정고시 출신 학생을 위한 맞춤 정보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allUnis = getAllUniversities().map((u) => ({
    slug: u.slug,
    name: u.name,
    type: u.type,
    region: u.region,
    capacity: u.capacity,
    recommendation: u.recommendation,
  }));

  return (
    <html lang="ko">
      <body className="bg-slate-50 antialiased">
        <Sidebar universities={allUnis} />
        <main className="lg:ml-72 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
