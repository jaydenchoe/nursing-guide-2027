"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  universities: {
    slug: string;
    name: string;
    type: string;
    region: string;
    capacity?: number;
    recommendation?: string;
  }[];
}

export default function Sidebar({ universities }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fourYear = universities.filter((u) => u.type === "4년제");
  const college = universities.filter((u) => u.type === "전문대학");

  const filterBySearch = (
    list: typeof universities
  ) => {
    if (!searchQuery.trim()) return list;
    return list.filter((u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const fourYearSeoul = filterBySearch(
    fourYear.filter((u) => u.region === "서울")
  );
  const fourYearGyeonggi = filterBySearch(
    fourYear.filter((u) => u.region === "경기_인천")
  );
  const collegeSeoul = filterBySearch(
    college.filter((u) => u.region === "서울")
  );
  const collegeGyeonggi = filterBySearch(
    college.filter((u) => u.region === "경기_인천")
  );

  const NavLink = ({
    href,
    children,
    icon,
  }: {
    href: string;
    children: React.ReactNode;
    icon?: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
          isActive
            ? "bg-emerald-100 text-emerald-800 font-semibold shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
        }`}
      >
        {icon && <span className="text-base">{icon}</span>}
        <span className="truncate">{children}</span>
      </Link>
    );
  };

  const UniversityLink = ({
    uni,
  }: {
    uni: (typeof universities)[0];
  }) => {
    const href = `/university/${uni.slug}`;
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-all duration-200 group ${
          isActive
            ? "bg-emerald-100 text-emerald-800 font-medium"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
        }`}
      >
        <span className="truncate">{uni.name.replace(/ 간호학과| 간호대학| 간호학부/g, "")}</span>
        {uni.capacity && (
          <span className={`text-xs flex-shrink-0 ml-1 ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-500"}`}>
            {uni.capacity}명
          </span>
        )}
      </Link>
    );
  };

  const SectionGroup = ({
    title,
    items,
  }: {
    title: string;
    items: typeof universities;
  }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-1">
        <div className="px-3 py-1 text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </div>
        <div className="space-y-0.5">
          {items.map((uni) => (
            <UniversityLink key={uni.slug} uni={uni} />
          ))}
        </div>
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200">
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">+</span>
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm leading-tight">간호학과</div>
            <div className="text-xs text-slate-500">입시 가이드 2027</div>
          </div>
        </Link>
      </div>

      <div className="p-3">
        <input
          type="text"
          placeholder="대학 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="space-y-1 mb-4">
          <NavLink href="/" icon="🏠">홈</NavLink>
          <NavLink href="/strategy" icon="🎯">최적 입시 전략</NavLink>
          <NavLink href="/overview/4year" icon="🏫">4년제 대학 개요</NavLink>
          <NavLink href="/overview/college" icon="📚">전문대학 개요</NavLink>
          <NavLink href="/profile" icon="👩‍🎓">유민이 프로필</NavLink>
        </div>

        <div className="border-t border-slate-200 pt-3 mb-2">
          <div className="px-3 py-2 text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <span>🏫</span> 4년제 대학
          </div>
          <SectionGroup title="서울" items={fourYearSeoul} />
          <SectionGroup title="경기/인천" items={fourYearGyeonggi} />
        </div>

        <div className="border-t border-slate-200 pt-3 mb-2">
          <div className="px-3 py-2 text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <span>📚</span> 전문대학
          </div>
          <SectionGroup title="서울" items={collegeSeoul} />
          <SectionGroup title="경기/인천" items={collegeGyeonggi} />
        </div>
      </nav>

      <div className="p-3 border-t border-slate-200 text-xs text-slate-400 text-center">
        2026년 2월 기준
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-40 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
