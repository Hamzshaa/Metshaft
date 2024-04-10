export default function DashRecentUsersSkeletonLoading() {
  return (
    <div className="flex flex-col gap-6 mt-8">
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <div className="flex flex-col gap-2 mx-3 mb-0" key={index}>
            <div className="flex justify-between items-end">
              <div className="flex gap-3 items-center ">
                <div className="w-16 h-16 md:w-10 md:h-10 rounded-full object-cover max-w-16 bg-gray-300 dark:bg-gray-400 animate-pulse"></div>
                <div className="flex flex-col">
                  <div className="w-32 h-5 bg-gray-300 dark:bg-gray-400 animate-pulse rounded-sm"></div>
                  <div className="w-40 h-3 bg-gray-300 dark:bg-gray-500 animate-pulse mt-3 rounded-sm"></div>
                </div>
              </div>
              <div className="pb-2">
                <div className="w-20 h-2 bg-gray-300 dark:bg-gray-500 animate-pulse rounded-sm"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
