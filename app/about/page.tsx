export const metadata = {
  title: "About | 취업의신 잡프라이즈 소개",
  description:
    "취업의신 잡프라이즈 - 15년 취업컨설팅 노하우와 30,000건 이상의 취업데이터로 검증된 대한민국 대표 취업 컨설팅 브랜드. 취업의신과 함께하는 합격 스토리.",
  keywords: [
    "취업의신",
    "잡프라이즈",
    "취업컨설팅",
    "합격전략",
    "취업특강",
    "면접컨설팅",
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            취업의신 잡프라이즈
          </h1>
          <p className="text-xl text-gray-600">
            15년 노하우로 증명된 취업의신의 취업 성공 솔루션
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              잡프라이즈는?
            </h2>
            <p className="text-gray-700 mb-4">
              2011년 창업 이후 15년간, '취업의신' 브랜드로 1,600만 명의 누적
              방문자와 6만6천 명 이상의 특강 청강자를 기록한 국내 대표 취업이직
              컨설팅 브랜드입니다.
            </p>
            <p className="text-gray-700">
              저스펙 출신으로 대기업·공기업·외국계 취업에 성공한 박장호 대표의
              실제 커리어 데이터를 기반으로, 수천 명의 구직자들이 합격의 길을
              걸었습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-[#E20871] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                브랜드 역사
              </h3>
              <p className="text-gray-600">
                2011년 오프라인 컨설팅으로 출발하여, 전국 대학·지자체와 협력해
                200회 이상의 취업특강과 실무형 프로그램을 진행했습니다.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5v8h4zm6 0V9a2 2 0 00-2-2h-2v12h4z"
                  />
                </svg>
                취업·채용 플랫폼 '취팡(Jobpang)'
              </h3>
              <p className="text-gray-600">
                17,000건의 입사서류, 30,000건 이상의 취업데이터, 350개 기업
                인사담당자 네트워크를 기반으로 AI 없이도 검증된 취업지원
                플랫폼이 26년 2월 런칭됩니다.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-purple-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                HR아너스포럼
              </h3>
              <p className="text-gray-600">
                350개 기업 인사담당자 비영리법인단체 HR아너스포럼을 운영하며,
                실제 기업의 채용기준과 평가데이터를 함께 연구합니다.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-red-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5v-8h14v8h-3l-4 4z"
                  />
                </svg>
                대표 저서 및 미디어
              </h3>
              <p className="text-gray-600">
                베스트셀러 『자기소개서 혁명』, 『취업이직 혁명』의 저자
                브랜드로 KBS·YTN·MBC 등 주요 언론에서 취업멘토로 소개되었습니다.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              잡프라이즈의 철학
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  1. 데이터로 증명된 진정성
                </h3>
                <p className="text-gray-600">
                  단순한 취업 정보가 아닌, 실제 합격자들의 이력과 평가 기준을
                  수집·분석하여 재현 가능한 성공공식을 제공합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2. 구직자 중심의 실무형 접근
                </h3>
                <p className="text-gray-600">
                  구직자의 실제 서류, 인터뷰, 행동 데이터를 기반으로 '합격
                  가능한 변화'를 만들어냅니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  3. 교육을 넘어, 커리어 생태계로
                </h3>
                <p className="text-gray-600">
                  컨설팅·데이터·플랫폼을 결합해, 취업에서 이직·경력관리까지
                  이어지는 커리어 생태계를 만들어가고 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-[#E20871] to-[#A0054F] text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">취업 러닝 메이트</h2>
            <p className="text-xl mb-6 opacity-90">
              잡프라이즈는 단순 컨설팅 회사를 넘어, 커리어의 방향을 함께
              설계하는 파트너입니다.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="http://pf.kakao.com/_CxofCd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-[#E20871] font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                취업상담 문의하기
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              <a
                href="https://blog.naver.com/jobprise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-[#E20871] transition-colors"
              >
                합격후기 보기
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
