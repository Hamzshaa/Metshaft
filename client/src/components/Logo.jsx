export default function Logo() {
  return (
    <div className="text-center z-10">
      {/* <h1 className="mt-10 text-6xl">
            <span className="text-teal-400 text-8xl">T</span>rident{" "}
            <span className="border-t border-red-900 border-t-[6px]  border-t-teal-400">
              Metshaft
            </span>
          </h1> */}
      <div className="flex items-end w-fit mx-auto z-10">
        <span className="text-teal-400 text-6xl -mr-[6px] sm:text-8xl md:text-[120px] md:-mr-4">
          T
        </span>
        <div className="flex flex-col z-10">
          <div className="h-[4px] sm:h-[7px] md:h-[9px] w-[80%] mx-auto mb-0 pb-0 bg-teal-400 "></div>
          <h1 className="text-3xl mt-[7px] sm:text-6xl sm:mb-1 sm:mt-[4px] md:text-7xl md:mt-[6px] md:mb-[8px]">
            rident <span className="text-yellow-400">M</span>
            etshaft
          </h1>
        </div>
      </div>
      <h3 className="text-md text-slate-800 dark:text-slate-300 sm:text-2xl md:text-3xl">
        Remember your journey
      </h3>
    </div>
  );
}
