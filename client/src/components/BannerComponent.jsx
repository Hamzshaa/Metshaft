import { Banner, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

export default function BannerComponent() {
  return (
    <Banner className="py-4">
      <div className="flex w-[calc(100%-2rem)] mx-auto flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl absolute top-2 left-2 right-2 z-30">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <a
            href="https://hamzshaa.github.io/Personal-Portfolio/"
            target="_blank"
            className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r"
          >
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
              Ham
              <span className="font-bold text-3xl px-[4px]">zz</span>
              shaa
            </span>
          </a>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            Explore more works or get in touch with the developer by simply
            touching the button!
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <Button
            gradientDuoTone="tealToLime"
            href="https://hamzshaa.github.io/Personal-Portfolio/"
            target="_blank"
            size={"xs"}
          >
            Explore portfolio
          </Button>
          <Banner.CollapseButton
            color="gray"
            className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
          >
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton>
        </div>
      </div>
    </Banner>
  );
}
