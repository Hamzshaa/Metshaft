import { Button } from "flowbite-react";
import Banner from "../components/BannerComponent";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import lightLogo from "../assets/logo_light.png";
import darkLogo from "../assets/logo_dark.png";

export default function Home() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="relative">
      <div className="h-[var(--body-height)] w-full bg-slate-50 dark:bg-slate-800 absolute top-0 bg-opacity-90 dark:bg-opacity-80 -z-0"></div>
      <div className="h-[var(--body-height)] bg-logo-bgg bg-[url('./assets/logo_bg.jpg')] bg-no-repeat bg-cover bg-center"></div>
      <div className="z-20 absolute top-8 w-full h-[var(--body-height)] mt-20 sm:mt-16 md:mt-16">
        {/* <Logo /> */}
        <div className="h-[200px] items-center flex justify-center">
          <img
            src={theme == "dark" ? darkLogo : lightLogo}
            className="overflow-hidden -mb-10 "
          />
        </div>
        <div className="mt-10 text-center max-w-[600px] mx-auto">
          <div className="h-[200px] relative">
            <div
              id="animated-div"
              className="border-y border-y-yellow-400 w-[90%] mx-auto overflow-y-hidden flex rounded-md"
            >
              {/* <div className="text-yellow-500"> */}
              {/* <h2 id="animated-text" className="">
              Discover, Track, and Relive Your Reading Adventures
            </h2>
            <h3 className="">Trident Metshaft - Your Personal Bookshelf</h3>
            <a href="#" className="cta-button">
              Get Started
            </a> */}
              <h2
                id="animated-text"
                className="self-center h-fit w-fit m-auto text-center text-lg dark:text-slate-100"
              ></h2>
            </div>
            <Link to="/add">
              <Button
                size="md"
                color="yellow"
                className="absolute bottom-0 left-0 w-1/2 mx-[25%]"
              >
                Add book
              </Button>
            </Link>
          </div>
        </div>

        {/* <section className="mt-10 text-center">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="mt-2 flex flex-col gap-1 font-sans font-medium">
            <Link to="/add" className="w-fit mx-auto">
              <li className="w-fit mx-auto bg-yellow-200 dark:bg-teal-400 px-2 py-[2px] rounded-md">
                Effortlessly Save Your Reads
              </li>
            </Link>
            <Link to="/progress" className="w-fit mx-auto">
              <li className="w-fit mx-auto border-2 border-yellow-200 dark:border-teal-400 px-2 py-[2px] rounded-md">
                Track Your Progress
              </li>
            </Link>
            <li className="text-blue-700 cursor-pointer hover:underline">
              Personalize Your Library
            </li>
            <li className="text-blue-700 cursor-pointer hover:underline">
              Discover New Recommendations
            </li>
          </ul>
        </section> */}
      </div>

      <div className="h-[50vh] bg-slate-500"></div>
      <div className="hidden md:block">{/* <Banner className="" /> */}</div>
    </div>
  );
}
