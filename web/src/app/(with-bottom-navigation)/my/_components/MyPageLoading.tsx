export default function MyPageLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main title */}
      <div className="text-left py-[13px] px-[16px]">
        <h1 className="text-title-main">마이</h1>
      </div>

      {/* Profile Section Loading */}
      <div className="px-[16px] pt-[20px] py-[28px]">
        <div className="flex items-center space-x-4">
          <div className="w-[48px] h-[48px] rounded-full bg-gray-700 animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          <div className="w-5 h-5 bg-gray-700 animate-pulse" />
        </div>
      </div>

      <div className="bg-gray-700 h-[8px]" />

      {/* Settings Section Loading */}
      <div className="pt-[28px] px-[16px] pb-[24px]">
        <div className="h-4 bg-gray-700 rounded w-16 mb-4 animate-pulse" />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
            <div className="w-5 h-5 bg-gray-700 animate-pulse" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-700 rounded w-8 animate-pulse" />
              <div className="w-5 h-5 bg-gray-700 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* App Information Section Loading */}
      <div className="px-4">
        <div className="border-t border-gray-700 pt-4">
          <div className="h-4 bg-gray-700 rounded w-20 mb-4 animate-pulse" />
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
              <div className="w-5 h-5 bg-gray-700 animate-pulse" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-700 rounded w-12 animate-pulse" />
                <div className="w-5 h-5 bg-gray-700 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
