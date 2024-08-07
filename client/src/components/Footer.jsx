import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaPhone,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import lightLogo from "../assets/logo_light.png";
import darkLogo from "../assets/logo_dark.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const socialMediaData = [
  {
    icon: <FaGithub />,
    path: "https://github.com/Hamzshaa/",
  },
  {
    icon: <FaLinkedin />,
    path: "https://www.linkedin.com/in/hamza-jhad-ba5b36291/",
  },
  {
    icon: <FaWhatsapp />,
    path: "https://api.whatsapp.com/send?phone=+251929248080&text=Hello",
  },
  {
    icon: <FaTelegram />,
    path: "https://t.me/Hamzshaa",
  },
];

export default function Footer() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="bg-gray-100 dark:bg-gray-700 pt-24">
      <div className="flex gap-2 justify-center mb-8">
        {socialMediaData.map((item) => (
          <div
            className="bg-gray-200 dark:bg-gray-600 p-3 w-fit rounded-full"
            key={item.icon}
          >
            <a href={item.path}>{item.icon}</a>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 justify-center text-gray-700 dark:text-gray-300 items-center sm:flex-row sm:gap-8">
        <div className="flex items-center gap-2">
          <span className="">
            <FaPhone />
          </span>
          <span className="">+2519-2924-8080</span>
        </div>
        <a
          href="mailto:trident32000@gmail.com"
          className="flex items-center gap-2"
        >
          <span className="">
            <IoMail />
          </span>
          <span className="">trident32000@gmail.com</span>
        </a>
      </div>

      <div className="h-[100px] items-center flex justify-center my-10">
        <Link to="/">
          <img
            src={theme != "dark" ? lightLogo : darkLogo}
            className="overflow-hidden w-56"
          />
        </Link>
      </div>
      <div className="border-t-2 pt-4 flex gap-2 justify-center items-center text-gray-600 dark:text-gray-400 text-sm pb-5">
        <div className="">Copyright © {new Date().getFullYear()}</div>
        <div className="bg-gray-600 mt-1 h-1 w-1 rounded-full" />
        <div className="">Powered by Hamza Jhad</div>
      </div>
    </div>
  );
}
