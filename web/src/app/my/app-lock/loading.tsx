export default function AppLockPageLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0">
        <div className="flex-1 flex justify-center items-center">
          <div className="h-6 bg-gray-700 rounded w-24 animate-pulse" />
        </div>
      </div>
      {/* 알림 설정 리스트 */}
      <ul className="flex flex-col gap-4 pt-14  px-4">
        {/* 항목 1 */}
        <li className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-36 rounded bg-gray-700" />
          </div>
          {/* 토글 자리 */}
          <div className="h-6 w-12 rounded-full bg-gray-700" />
        </li>
        {/* 항목 2 */}
        <li className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-gray-700" />
          </div>
          {/* 토글 자리 */}
          <div className="h-6 w-12 rounded-full bg-gray-700" />
        </li>
      </ul>
    </div>
  );
}
