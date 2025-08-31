export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          DPM17 Team4 Web View
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center px-6 leading-relaxed">
          React Native WebView 에서<br />
          표시되는 웹 페이지입니다.
        </p>
        <p>테스트</p>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              기능 목록
            </h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• React Native 앱에서 웹뷰로 표시</li>
              <li>• Next.js 15 기반</li>
              <li>• TypeScript 지원</li>
              <li>• Tailwind CSS 스타일링</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
