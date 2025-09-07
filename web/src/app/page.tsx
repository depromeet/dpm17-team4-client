'use client';

import { useRecordMutation, useReportQuery } from '@/hooks';

export default function Home() {
  // 커스텀 훅을 사용한 점수 데이터 조회
  const { data: scoreData, isLoading, error, refetch } = useReportQuery();

  // 커스텀 훅을 사용한 색상 저장 mutation
  const { mutate, isPending, isSuccess, isError } = useRecordMutation();

  // 테스트용 데이터 저장 함수
  const handleRecordData = () => {
    const testColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const shapes = ['circle', 'square', 'triangle', 'rectangle'];
    const testShape = shapes[Math.floor(Math.random() * shapes.length)];
    const testTime = new Date().toISOString();
    const testInfo = `Test data created at ${new Date().toLocaleString()}`;

    mutate({
      color: testColor,
      shape: testShape,
      time: testTime,
      info: testInfo,
      onSuccess: () => {
        alert('데이터가 성공적으로 저장되었습니다!');
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          DPM17 Team4 Web View
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center px-6 leading-relaxed">
          React Native WebView 에서
          <br />
          표시되는 웹 페이지입니다.
        </p>

        <div className="space-y-4">
          {/* 점수 데이터 표시 */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              점수 리포트
            </h2>

            {isLoading && (
              <div className="text-blue-600">데이터를 불러오는 중...</div>
            )}

            {error && (
              <div className="text-red-600 mb-4">
                오류:{' '}
                {error instanceof Error
                  ? error.message
                  : '알 수 없는 오류가 발생했습니다'}
                <button
                  onClick={() => refetch()}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  다시 시도
                </button>
              </div>
            )}

            {scoreData && !isLoading && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">총점:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {scoreData.score}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    상세 점수
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>정확도:</span>
                      <span>{scoreData.details.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>속도:</span>
                      <span>{scoreData.details.speed}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일관성:</span>
                      <span>{scoreData.details.consistency}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 테스트용 데이터 저장 버튼 */}
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={handleRecordData}
                disabled={isPending}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? '저장 중...' : '랜덤 데이터 저장 테스트'}
              </button>
              {isSuccess && (
                <div className="mt-2 text-sm text-green-600">
                  데이터가 성공적으로 저장되었습니다!
                </div>
              )}
              {isError && (
                <div className="mt-2 text-sm text-red-600">
                  데이터 저장에 실패했습니다.
                </div>
              )}
            </div>
          </div>

          {/* 기존 기능 목록 */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              기능 목록
            </h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• React Native 앱에서 웹뷰로 표시</li>
              <li>• Next.js 15 기반</li>
              <li>• TypeScript 지원</li>
              <li>• Tailwind CSS 스타일링</li>
              <li>• API 연동 (점수 조회, 색상 저장)</li>
              <li>• React Query로 서버 상태 관리</li>
              <li>• Axios로 HTTP 클라이언트 관리</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
