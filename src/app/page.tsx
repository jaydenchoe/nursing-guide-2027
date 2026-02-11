import Link from "next/link";
import { getAllUniversities } from "@/lib/content";

export default function Home() {
  const universities = getAllUniversities();
  const fourYear = universities.filter((u) => u.type === "4년제");
  const college = universities.filter((u) => u.type === "전문대학");
  const totalCapacity = universities.reduce((sum, u) => sum + (u.capacity || 0), 0);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2020L20%200L40%2020L20%2040z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            2027학년도 입시 준비
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            간호학과 입시 종합 가이드
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mb-6">
            서울/수도권 44개교 간호학과 입시 정보를 한눈에 파악하고 검정고시 출신 학생을 위한 맞춤 전략을 세워보세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/strategy"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              <span>🎯</span> 최적 입시 전략 보기
            </Link>
            <Link
              href="/overview/4year"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white rounded-lg font-medium hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20"
            >
              <span>🏫</span> 대학 목록 보기
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "총 대학 수", value: `${universities.length}개교`, icon: "🏫", color: "emerald" },
          { label: "총 모집 정원", value: `${totalCapacity.toLocaleString()}명`, icon: "👥", color: "blue" },
          { label: "4년제 대학", value: `${fourYear.length}개교`, icon: "🎓", color: "purple" },
          { label: "전문대학", value: `${college.length}개교`, icon: "📚", color: "amber" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Key Info for GED Students */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg">💡</span>
          검정고시 출신자 핵심 정보
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "비교내신 제도",
              desc: "검정고시 만점(100점)이어도 비교내신 2~3등급으로 환산되는 것이 일반적이다. 대학마다 환산 방식이 다르므로 사전 확인이 필수다.",
              tag: "필수 이해",
              tagColor: "red",
            },
            {
              title: "전문대 지원 무제한",
              desc: "전문대학은 수시 지원 횟수 제한이 없다. 4년제 6개교 + 전문대 다수 지원이라는 전략이 가능하다.",
              tag: "큰 장점",
              tagColor: "emerald",
            },
            {
              title: "학종이 가장 유리",
              desc: "학생부종합전형은 학생부 대체서식으로 대안학교 활동 경험을 어필할 수 있어 검정고시 출신에게 가장 기회가 많다.",
              tag: "핵심 전형",
              tagColor: "blue",
            },
            {
              title: "수능 100% 전형",
              desc: "정시에서 수능 100% 전형은 검정고시 출신에게 가장 공정한 경쟁이 가능한 전형이다.",
              tag: "공정 경쟁",
              tagColor: "purple",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.tagColor === "red"
                      ? "bg-red-100 text-red-700"
                      : item.tagColor === "emerald"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.tagColor === "blue"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="font-semibold text-slate-700">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-lg">📅</span>
          주요 일정 (2027학년도 예상)
        </h2>
        <div className="space-y-4">
          {[
            { date: "2026년 5~6월", event: "2027학년도 수시 모집요강 발표", status: "upcoming" },
            { date: "2026년 8월", event: "최신 모집요강 확정 및 공개", status: "upcoming" },
            { date: "2026년 9월", event: "수시1차 원서접수 (전문대 + 4년제)", status: "upcoming" },
            { date: "2026년 11월", event: "수시2차 원서접수 (전문대) / 수능 시험", status: "upcoming" },
            { date: "2026년 12월", event: "수시 합격자 발표", status: "upcoming" },
            { date: "2026.12~2027.1", event: "정시 원서접수", status: "upcoming" },
            { date: "2027년 2월", event: "정시 합격자 발표", status: "upcoming" },
            { date: "2027년 3월", event: "입학", status: "goal" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-28 sm:w-36 text-right">
                <span className="text-sm font-medium text-slate-500">{item.date}</span>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    item.status === "goal"
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-emerald-400"
                  }`}
                />
                {i < 7 && <div className="w-0.5 h-8 bg-emerald-200 mt-1" />}
              </div>
              <div className="pb-2">
                <span
                  className={`text-sm ${
                    item.status === "goal"
                      ? "font-bold text-emerald-700"
                      : "text-slate-600"
                  }`}
                >
                  {item.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick University Lists */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🏫</span> 4년제 대학 ({fourYear.length}개교)
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2">서울</h3>
              <div className="flex flex-wrap gap-1.5">
                {fourYear
                  .filter((u) => u.region === "서울")
                  .map((u) => (
                    <Link
                      key={u.slug}
                      href={`/university/${u.slug}`}
                      className="inline-block text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                    >
                      {u.name.replace(/ 간호학과| 간호대학| 간호학부/g, "")}
                    </Link>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2">경기/인천</h3>
              <div className="flex flex-wrap gap-1.5">
                {fourYear
                  .filter((u) => u.region === "경기_인천")
                  .map((u) => (
                    <Link
                      key={u.slug}
                      href={`/university/${u.slug}`}
                      className="inline-block text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                    >
                      {u.name.replace(/ 간호학과| 간호대학| 간호학부/g, "")}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <Link href="/overview/4year" className="inline-block mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            전체 보기 →
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📚</span> 전문대학 ({college.length}개교)
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2">서울</h3>
              <div className="flex flex-wrap gap-1.5">
                {college
                  .filter((u) => u.region === "서울")
                  .map((u) => (
                    <Link
                      key={u.slug}
                      href={`/university/${u.slug}`}
                      className="inline-block text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      {u.name.replace(/ 간호학과| 간호대학| 간호학부/g, "")}
                    </Link>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2">경기/인천</h3>
              <div className="flex flex-wrap gap-1.5">
                {college
                  .filter((u) => u.region === "경기_인천")
                  .map((u) => (
                    <Link
                      key={u.slug}
                      href={`/university/${u.slug}`}
                      className="inline-block text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      {u.name.replace(/ 간호학과| 간호대학| 간호학부/g, "")}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <Link href="/overview/college" className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            전체 보기 →
          </Link>
        </div>
      </div>

      {/* Reference Sites */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🔗</span> 참고 사이트
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { name: "검정고시로대학가기", desc: "비교내신 환산 및 합격 예측", url: "https://www.gumjung.co.kr" },
            { name: "대입정보포털 어디가", desc: "대학별 모집요강 및 전형 정보", url: "https://www.adiga.kr" },
            { name: "전문대학포털", desc: "전문대학 입학 일정 및 상담", url: "https://www.procollege.kr" },
          ].map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="font-medium text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">{site.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{site.desc}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-slate-400 py-4">
        이 가이드는 2026년 2월 기준으로 작성되었으며 2027학년도 모집요강 발표 후 반드시 업데이트해야 합니다.
      </div>
    </div>
  );
}
