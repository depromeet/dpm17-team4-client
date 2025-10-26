'use client';

import Link from 'next/link';
import { useRecordMutation, useReportQuery } from '@/hooks';

export default function FetchTestPage() {
  const { data: scoreData, isLoading, error, refetch } = useReportQuery();

  const { mutate, isPending, isSuccess, isError } = useRecordMutation();

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
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← 메인 페이지로 돌아가기
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          API 테스트 페이지
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          API 연동 및 데이터 조회/저장 기능을 테스트할 수 있습니다.
        </p>

        <div className="space-y-6">
          {/* 점수 데이터 조회 테스트 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              📊 점수 데이터 조회 테스트
            </h2>

            {isLoading && (
              <div className="text-blue-600 flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                데이터를 불러오는 중...
              </div>
            )}

            {error && (
              <div className="text-red-600 mb-4 p-4 bg-red-50 rounded-lg">
                <div className="font-semibold mb-2">오류 발생:</div>
                <div className="mb-3">
                  {error instanceof Error
                    ? error.message
                    : '알 수 없는 오류가 발생했습니다'}
                </div>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}

            {scoreData && !isLoading && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">배변 점수:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {Math.round(scoreData.poo.score)}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    리포트 데이터
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">배변 기록 수</span>
                      <span className="font-semibold text-green-600">
                        {scoreData.poo.items.length}개
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">식단 기록 수</span>
                      <span className="font-semibold text-blue-600">
                        {scoreData.food.items.length}개
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">물 섭취 기록 수</span>
                      <span className="font-semibold text-purple-600">
                        {scoreData.water.items.length}개
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">업데이트 시간</span>
                      <span className="font-semibold text-gray-600 text-sm">
                        {new Date(scoreData.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 데이터 저장 테스트 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              💾 데이터 저장 테스트
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600">
                랜덤한 색상과 도형 데이터를 생성하여 서버에 저장합니다.
              </p>

              <button
                type="button"
                onClick={handleRecordData}
                disabled={isPending}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    저장 중...
                  </div>
                ) : (
                  '랜덤 데이터 저장 테스트'
                )}
              </button>

              {isSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-800">
                    <span className="mr-2">✅</span>
                    데이터가 성공적으로 저장되었습니다!
                  </div>
                </div>
              )}

              {isError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-800">
                    <span className="mr-2">❌</span>
                    데이터 저장에 실패했습니다.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* API 정보 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              🔧 API 정보
            </h2>
            <div className="text-left space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>조회 API:</span>
                <span className="font-mono text-sm">useReportQuery</span>
              </div>
              <div className="flex justify-between">
                <span>저장 API:</span>
                <span className="font-mono text-sm">useRecordMutation</span>
              </div>
              <div className="flex justify-between">
                <span>상태 관리:</span>
                <span className="font-mono text-sm">React Query</span>
              </div>
              <div className="flex justify-between">
                <span>HTTP 클라이언트:</span>
                <span className="font-mono text-sm">Axios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
