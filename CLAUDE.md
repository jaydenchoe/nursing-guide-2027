# 간호학과 입시 가이드 웹사이트 - 에이전트 배포 가이드

> 이 문서는 Cowork 세션이 바뀌어도 에이전트가 자동으로 참조할 수 있도록 작성된 배포 및 개발 가이드이다.
> 새 세션에서 이 프로젝트 관련 작업을 할 때 반드시 이 문서를 먼저 읽어야 한다.

---

## 프로젝트 개요

서울/수도권 간호학과 입시 종합 가이드 웹사이트이다. 검정고시 출신 학생을 위한 맞춤 정보를 제공하며 44개 학교(4년제 24개 + 전문대학 20개)의 정보를 담고 있다.

### 개인정보 및 공개 범위

이 웹사이트는 가족 전용으로 운영되며 외부에 공개하지 않는다. 따라서 학생 이름(최유민)과 자택 주소와 성적 등 개인정보가 콘텐츠에 포함되어 있어도 프라이버시 문제가 없다. 최유민 학생 프로필 파일을 포함한 모든 콘텐츠를 GitHub 저장소에 푸시하고 웹사이트에 게시해도 된다.

---

## 핵심 정보 (반드시 숙지)

### GitHub 저장소
- URL: https://github.com/jaydenchoe/nursing-guide-2027.git
- 기본 브랜치: `main` (주의: `master`가 아님)
- 소유자: jaydenchoe

### Vercel 배포
- 프로젝트명: `nursing-guide`
- 팀/계정: `jaydenchoes-projects`
- 라이브 URL: https://nursing-guide-pi.vercel.app/
- 커스텀 도메인: https://nursing.ondeviceai.dev
- 배포 방식: GitHub `main` 브랜치에 push하면 Vercel이 자동으로 빌드 및 배포한다

### GitHub 인증 (Push 방법)
- Fine-grained Personal Access Token 사용
- **현재 유효한 토큰 (2026-02-12 발급)**: `<PAT_TOKEN>`
- Push 명령어: `git push https://<PAT_TOKEN>@github.com/jaydenchoe/nursing-guide-2027.git main`
- 토큰 관리 페이지: https://github.com/settings/personal-access-tokens
- 주의: 토큰은 만료될 수 있으므로 push 실패 시 사용자에게 새 토큰 생성을 요청해야 한다
- 토큰이 만료된 경우 사용자에게 GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens에서 새로 발급받도록 안내한다

---

## 기술 스택

- Next.js 16.1.6 (Turbopack)
- React 19.2.3
- TypeScript
- Tailwind CSS 4
- react-markdown + remark-gfm (마크다운 렌더링)
- gray-matter (프론트매터 파싱)
- 정적 빌드: `output: "export"` (next.config.ts에 설정됨)

---

## 프로젝트 구조

```
nursing-guide-2027/
├── next.config.ts          # output: "export" + images: { unoptimized: true }
├── package.json            # Next.js 16.1.6
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 루트 레이아웃 (Sidebar 포함)
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── globals.css     # 글로벌 스타일
│   │   ├── overview/       # 학교 목록 총괄 페이지
│   │   ├── profile/        # 유민이 프로필 페이지
│   │   ├── strategy/       # 입시 전략 페이지
│   │   └── university/
│   │       └── [slug]/
│   │           └── page.tsx  # 개별 학교 상세 페이지 (동적 라우트)
│   ├── components/
│   │   ├── MarkdownRenderer.tsx  # "use client" 마크다운 렌더러
│   │   └── Sidebar.tsx           # 사이드바 네비게이션
│   ├── content/                  # 마크다운 콘텐츠 (원본 데이터)
│   │   ├── README.md
│   │   ├── 최유민_학생_프로필.md
│   │   ├── 최적_입시_전략.md
│   │   ├── 4년제_대학/
│   │   │   ├── 서울/          # 12개 학교 .md 파일
│   │   │   └── 경기_인천/     # 12개 학교 .md 파일
│   │   └── 전문대학/
│   │       ├── 서울/          # 3개 학교 .md 파일
│   │       └── 경기_인천/     # 17개 학교 .md 파일
│   └── lib/
│       └── content.ts        # 콘텐츠 로딩 + 슬러그 매핑 테이블
└── public/
    └── favicon.ico
```

---

## URL 슬러그 시스템 (매우 중요)

Vercel CDN은 한국어 파일명을 서빙할 수 없기 때문에 영문 ASCII 슬러그를 사용한다. `src/lib/content.ts` 파일에 한국어 파일명 → 영문 슬러그 매핑 테이블(`slugMap`)이 정의되어 있다.

### 슬러그 매핑 전체 목록

#### 4년제 대학 - 서울 (12개)
| 마크다운 파일명 | URL 슬러그 |
|---|---|
| 가톨릭대학교_간호학과 | catholic-univ |
| 강서대학교_케이씨대학교_간호학과 | gangseo-kc-univ |
| 경희대학교_간호학과 | kyunghee-univ |
| 고려대학교_간호학과 | korea-univ |
| 삼육대학교_간호학과 | sahmyook-univ |
| 서울대학교_간호대학 | seoul-national-univ |
| 성신여자대학교_간호학과 | sungshin-univ |
| 연세대학교_간호대학 | yonsei-univ |
| 이화여자대학교_간호학부 | ewha-univ |
| 중앙대학교_간호학과 | chungang-univ |
| 한국성서대학교_간호학과 | korean-bible-univ |
| 한양대학교_간호학과 | hanyang-univ |

#### 4년제 대학 - 경기/인천 (12개)
| 마크다운 파일명 | URL 슬러그 |
|---|---|
| 가천대학교_간호학과 | gachon-univ |
| 대진대학교_간호학과 | daejin-univ |
| 수원대학교_간호학과 | suwon-univ |
| 신한대학교_간호학과 | shinhan-univ |
| 아주대학교_간호학과 | ajou-univ |
| 을지대학교_간호학과_부천 | eulji-univ-bucheon |
| 을지대학교_간호학과_성남 | eulji-univ-seongnam |
| 인천가톨릭대학교_간호학과 | incheon-catholic-univ |
| 인하대학교_간호학과 | inha-univ |
| 차의과학대학교_간호학과 | cha-univ |
| 한세대학교_간호학과 | hansei-univ |
| 화성의과학대학교_간호학과 | hwaseong-medi-science-college |

#### 전문대학 - 서울 (3개)
| 마크다운 파일명 | URL 슬러그 |
|---|---|
| 삼육보건대학교_간호학과 | sahmyook-health-college |
| 서울여자간호대학교_간호학과 | seoul-women-nursing-college |
| 서일대학교_간호학과 | seoil-college |

#### 전문대학 - 경기/인천 (17개)
| 마크다운 파일명 | URL 슬러그 |
|---|---|
| 경민대학교_간호학과 | kyungmin-college |
| 경복대학교_간호학과 | kyungbok-college |
| 경인여자대학교_간호학과 | kyungin-women-college |
| 국제대학교_간호학과 | kukje-college |
| 동남보건대학교_간호학과 | dongnam-health-college |
| 두원공과대학교_간호학과_안성 | doowon-college-anseong |
| 두원공과대학교_간호학과_파주 | doowon-college-paju |
| 부천대학교_간호학과 | bucheon-college |
| 서영대학교_간호학과_파주 | seoyoung-college-paju |
| 서정대학교_간호학과 | seojeong-college |
| 수원과학대학교_간호학과 | suwon-science-college |
| 수원여자대학교_간호학과 | suwon-women-college |
| 안산대학교_간호학과 | ansan-college |
| 여주대학교_간호학과 | yeoju-college |
| 연성대학교_간호학과 | yeonsung-college |
| 용인예술과학대학교_간호학과 | yongin-arts-science-college |
| 인천재능대학교_간호학과 | incheon-jaenung-college |

#### 기타 콘텐츠
| 마크다운 파일명 | URL 슬러그 |
|---|---|
| 최유민_학생_프로필 | student-profile |

---

## 직선거리 산출 기준

개요 파일(README.md)과 전략 문서의 거리 데이터는 자택(과천시 양지마을2로 5-1)에서 각 학교까지의 Haversine 직선거리(km)로 산출되었다. 자택 좌표는 북위 37.4297 / 동경 126.9891이며 소수점 1자리 반올림으로 표기한다. 주소가 변경되면 좌표를 바꾸고 Python 스크립트(Haversine 공식)를 다시 실행하면 된다.

---

## 학교 마크다운 파일 스키마 (콘텐츠 작성/수정 시 필수 참조)

학교 마크다운 파일은 4년제 대학교와 전문대학 두 가지 포맷이 있다. 새 학교를 추가하거나 기존 파일을 수정할 때 반드시 아래 구조를 따라야 한다. 섹션 순서를 바꾸거나 필수 섹션을 누락하면 웹 렌더링이 깨질 수 있다.

### 공통 규칙

- 모든 파일의 H1 제목은 `# {학교명} 간호학과 입시 요강 (2027학년도)` 형식이다
- H1 바로 아래에 공통 안내 인용 블록이 온다: `> **이 문서는 2027학년도(2027년 3월 입학) 입시를 준비하는 검정고시 출신 학생을 위해 작성되었다.**`
- 섹션 구분자로 `---` (수평선)을 사용한다
- 취소선(`~~`)은 절대 사용 금지이다
- 범위 표기 시 물결표(`~`) 사용은 안전하다 (예: `25~35분`)
- 풋터에는 작성 기준일과 참고 사이트 링크를 포함한다

### 4년제 대학교 파일 구조

```
# {학교명} 간호학과 입시 요강 (2027학년도)
> 공통 안내 인용 블록
---
## 대학 개요                          ← 테이블 (필수)
## 입시 결과                          ← 테이블 (필수)
## 검정고시 출신 지원 가능 여부 요약  ← 테이블 (필수)
## 수시 전형 상세                     ← 서술형 (필수)
  ### 학생부교과 전형
  ### 학생부종합 전형
  ### 논술 전형
## 정시 전형 상세                     ← 서술형 (필수)
## 졸업생 취업률                      ← 테이블 (필수)
## 검정고시 학생 지원 팁              ← 서술형 (필수)
  ### 비교내신 환산 시 유의사항
  ### 준비 체크리스트
## 학교 및 간호학과 소개              ← 서술형 (필수)
  ### 주요 역사 및 연혁
  ### 인지도 및 세평
## 유민이를 위한 추천도               ← 테이블 (필수)
## 문의처                             ← 테이블 (필수)
풋터 (작성 기준일 + 참고 사이트)
```

### 전문대학 파일 구조 (4년제와의 차이점)

```
# {학교명} 간호학과 입시 요강 (2027학년도)
> 공통 안내 인용 블록
---
## 대학 개요                          ← 테이블 (4년제와 동일)
## 전문대학 간호학과 특징             ← 서술형 (★ 4년제에는 없음)
## 입시 결과                          ← 테이블 (4년제와 동일)
## 검정고시 출신 지원 가능 여부 요약  ← 테이블 (★ 2열: 전형 유형/지원 가능 여부)
## 수시 전형 상세                     ← 서술형 (★ 교과/학종/논술 구분 없이 통합 서술)
## 정시 전형 상세                     ← 서술형 (4년제와 동일)
## 졸업생 취업률                      ← 테이블 (4년제와 동일)
## 검정고시 학생 지원 팁              ← 서술형
  ### 전문대학 지원 시 핵심 포인트    ← (★ 4년제에는 없음)
  ### 비교내신 환산 시 유의사항
  ### 준비 체크리스트
## 학교 및 간호학과 소개              ← 서술형 (4년제와 동일)
  ### 주요 역사 및 연혁
  ### 인지도 및 세평
## 유민이를 위한 추천도               ← 테이블 (4년제와 동일)
## 문의처                             ← 테이블 (4년제와 동일)
풋터 (작성 기준일 + 참고 사이트)
```

### 테이블 스키마 상세

**대학 개요 테이블** (2열: 항목/내용)

| 필드명 | 예시 값 | 비고 |
|---|---|---|
| 학교명 | 가천대학교 간호학과 | |
| 학교 유형 | 4년제 대학교 / 전문대학 (4년제 간호학과) | |
| 소재지 | 경기도 성남시 수정구 성남대로 1342 | 전체 주소 |
| 지역 | 서울특별시 / 경기도/인천광역시 | 분류용 |
| 간호학과 정원 | 245명 | 숫자+명 |
| 병원 연계 | 자대병원 보유 / 재단병원 보유 / 없음 | 복수 가능 |
| 등록금 | 약 900만원/년 (추정) [2025학년도] | |
| 여자 기숙사 | 있음 (상세 정보) / 미확인 | |
| 입학처 전화 | 031-750-5114 | |
| 간호학과 홈페이지 | URL | |
| 입학처 홈페이지 | URL | |

**입시 결과 테이블** (3열: 항목/수치/연도)

| 필드명 | 예시 값 | 비고 |
|---|---|---|
| 경쟁률 | 3.93:1 (나군) | 전형별로 여러 행 가능 |
| 합격선 | 88.92 (백분위 70%컷) | |
| 연도 | 2025학년도 / 2026학년도 | |

**검정고시 출신 지원 가능 여부 테이블**

4년제: 3열 (전형 유형/지원 가능 여부/비고) - 행: 수시-학생부교과 / 수시-학생부종합 / 수시-논술 / 정시
전문대: 2열 (전형 유형/지원 가능 여부) - 행: 수시 / 정시

**졸업생 취업률 테이블** (2열: 항목/내용)

| 필드명 | 예시 값 | 비고 |
|---|---|---|
| 취업률 | 약 83% | "약" 접두사 사용 |
| 기준연도 | 2024년 대학알리미 공시 (2022년 졸업생 기준) | 고정 문구 |
| 비고 | 자대병원 취업 연계 강점 등 | 학교별 특이사항 |

**추천도 테이블** (2열: 항목/평가)

| 필드명 | 허용 값 |
|---|---|
| 경쟁 강도 | 낮음 / 중간 / 중상 / 높음 (괄호 안에 부연 가능) |
| 추천 등급 | 안전 / 안전~적정 / 적정 / 적정~도전 / 도전 (괄호 안에 "추천"/"강력 추천" 등 부연 가능) |

**문의처 테이블** (2열: 구분/연락처) - 행: 입학처 전화 / 간호학과 홈페이지 / 입학처 홈페이지

### 벌크 수정 가이드

44개 파일의 특정 필드를 일괄 수정해야 할 때는 Python 스크립트나 sed 명령어로 처리한다. 예를 들어 모든 파일의 취업률 기준연도를 변경하려면:

```bash
# 예시: 모든 .md 파일에서 "2024년 대학알리미 공시"를 "2025년 대학알리미 공시"로 변경
find <워크스페이스>/4년제_대학 <워크스페이스>/전문대학 -name "*.md" -exec sed -i 's/2024년 대학알리미 공시/2025년 대학알리미 공시/g' {} +
```

새 필드를 추가하거나 섹션 구조를 변경할 때는 하나의 파일을 먼저 수정하여 템플릿으로 확정한 뒤 나머지 43개 파일에 동일한 패턴을 적용한다.

---

## 콘텐츠 업데이트 절차

### 1단계: 워크스페이스 마크다운이 최신 소스

이 폴더(`간호학과_입시_요약/`)의 루트에 있는 마크다운 파일들이 콘텐츠의 원본이다.

```
간호학과_입시_요약/
├── 4년제_대학/
│   ├── 서울/          # 12개 .md
│   └── 경기_인천/     # 12개 .md
├── 전문대학/
│   ├── 서울/          # 3개 .md
│   └── 경기_인천/     # 17개 .md
├── README.md
└── 최적_입시_전략.md
```

### 2단계: GitHub 저장소 클론 및 콘텐츠 복사

```bash
# 1. 최신 저장소 클론
git clone https://github.com/jaydenchoe/nursing-guide-2027.git /tmp/nursing-repo
cd /tmp/nursing-repo

# 2. 워크스페이스 마크다운을 저장소의 content 폴더로 복사
# (워크스페이스 경로는 마운트 위치에 따라 다를 수 있음)
cp -r <워크스페이스>/4년제_대학/* src/content/4년제_대학/
cp -r <워크스페이스>/전문대학/* src/content/전문대학/
cp <워크스페이스>/README.md src/content/README.md
cp <워크스페이스>/최유민_학생_프로필.md src/content/최유민_학생_프로필.md
cp <워크스페이스>/최적_입시_전략.md src/content/최적_입시_전략.md
```

### 3단계: 새 학교 추가 시 슬러그 매핑 필수

새 학교 마크다운을 추가하는 경우 반드시 `src/lib/content.ts`의 `slugMap` 객체에 한국어→영문 매핑을 추가해야 한다. 매핑이 없으면 한국어 파일명 그대로 URL이 생성되어 Vercel CDN에서 404 오류가 발생한다.

### 4단계: 커밋 및 푸시

```bash
git add -A
git commit -m "설명적인 커밋 메시지"
git push https://<PAT_TOKEN>@github.com/jaydenchoe/nursing-guide-2027.git main
```

push가 완료되면 Vercel이 자동으로 빌드 및 배포한다. 보통 1-2분 내에 완료된다.

### 5단계: 배포 확인

https://nursing-guide-pi.vercel.app/ 에서 변경사항이 반영되었는지 확인한다.

---

## 로컬 빌드 (테스트용)

```bash
cd <저장소 경로>
npm install
npm run build
```

`output: "export"` 설정으로 인해 `out/` 디렉토리에 정적 HTML이 생성된다.

---

## 주의사항

1. **워크스페이스의 `nursing-guide-website/` 폴더는 오래된 사본이다.** 이 폴더는 초기 커밋 시점의 코드를 담고 있으며 ASCII 슬러그 매핑이 없다. GitHub `main` 브랜치의 코드가 최신이므로 항상 GitHub에서 클론해서 작업해야 한다.

2. **워크스페이스의 `nursing-guide-deploy/` 및 `nursing-guide-deploy-old/` 폴더도 오래된 정적 빌드 사본이다.** Vercel이 자동 배포하므로 로컬 정적 빌드는 불필요하다.

3. **마크다운 파일명에는 한국어를 사용하되 URL에는 반드시 영문 슬러그를 써야 한다.** Vercel CDN이 한국어 파일명을 서빙하지 못하기 때문이다.

4. **`output: "export"`를 절대 제거하지 마라.** Vercel에서 정적 사이트로 배포하기 위해 필수적인 설정이다.

5. **마운트된 파일시스템(`/mnt/`)의 기존 파일은 삭제/덮어쓰기가 불가능하다.** 수정이 필요한 경우 쓰기 가능한 경로(`/sessions/<session-id>/`)로 복사 후 작업해야 한다.

6. **GitHub PAT 토큰이 만료되었을 수 있다.** push 시 인증 오류가 발생하면 사용자에게 새 토큰을 발급받도록 요청한다.

7. **마크다운 콘텐츠에서 취소선(`~~`)을 절대 사용하지 마라.** 취소선 표기는 어떤 경우에도 사용 금지이다. 참고로 `MarkdownRenderer.tsx`에서 remark-gfm의 `singleTilde: false` 옵션을 설정하여 단일 `~` 문자(예: `25~35분` 같은 범위 표기)가 취소선으로 렌더링되지 않도록 처리되어 있다. 범위를 표기할 때는 물결표(`~`)를 사용해도 안전하지만 이중 물결표(`~~`)는 여전히 취소선으로 렌더링되므로 절대 사용하지 않는다.

---

## 커밋 히스토리 (참고)

가장 최근 커밋부터:

1. `9c910d2` - Replace commute times with straight-line distances and add student profile page
2. `1067d45` - Replace 서울대 with 인하대 in strategy page (비현실적이므로 제거)
3. `554c291` - Fix strikethrough: disable single tilde in remark-gfm
4. `7f5e6cf` - Add commute times, employment rates, and home-based strategy data (48 files)
5. `058ff7d` - Add admission results, tuition, dormitory, history and reputation to all 44 schools
6. `563e815` - Fill in admission data for all 44 nursing schools
7. `bafa3e9` - Unify overview table columns across 4-year and college pages
8. `1be7181` - Unify overview table fields and fix hospital data
9. `44f10b9` - Fix hospital affiliation data for 10 universities
10. `3cac0eb` - Fix MarkdownRenderer: pass content as children
11. `2e68ab4` - Use ASCII slugs for university URLs (Vercel CDN cannot serve files with Korean filenames)
12. `7c12d50` - Restore static export config to fix Korean URL 404 errors
13. `e2cbc91` - Remove static export config for Vercel deployment
14. `349b562` - Initial commit: nursing guide website

---

## 빠른 참조 명령어

```bash
# 저장소 클론
git clone https://github.com/jaydenchoe/nursing-guide-2027.git

# 빌드
cd nursing-guide-2027 && npm install && npm run build

# 푸시 (토큰 포함)
git push https://<TOKEN>@github.com/jaydenchoe/nursing-guide-2027.git main

# Vercel 대시보드
# https://vercel.com/jaydenchoes-projects/nursing-guide
```

---

*이 문서는 2026-02-13에 마지막으로 업데이트되었다. 프로젝트 구조나 배포 방식이 변경되면 이 문서도 업데이트해야 한다.*
