export default function ProfilePageLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigator Loading */}
      <div className="fixed top-0 left-0 w-full h-14 z-10 bg-gray-900 text-white p-4 flex shrink-0">
        <div className="flex-1 flex justify-center items-center">
          <div className="h-6 bg-gray-700 rounded w-24 animate-pulse" />
        </div>
      </div>

      <div className="pt-14">
        {/* Profile Avatar Section Loading */}
        <div className="flex justify-center py-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Personal Information Section Loading */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="h-4 bg-gray-700 rounded w-8 animate-pulse" />
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                <div className="w-5 h-5 bg-gray-700 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-700 rounded w-12 animate-pulse" />
                <div className="w-5 h-5 bg-gray-700 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="h-4 bg-gray-700 rounded w-8 animate-pulse" />
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-700 rounded w-12 animate-pulse" />
                <div className="w-5 h-5 bg-gray-700 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Section Loading */}
        <div className="px-4 py-4">
          <div className="border-t border-gray-700 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                <div className="w-5 h-5 bg-gray-700 animate-pulse" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
                <div className="w-5 h-5 bg-gray-700 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
