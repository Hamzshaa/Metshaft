import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  Modal,
  Navbar,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";

import darkLogo from "../assets/logo_dark.png";
import lightLogo from "../assets/logo_light.png";

export default function NavbarComponent() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState("");

  // const handleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
    // };
  }, []);

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
      return;
    }

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };

  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("api/auth/signout", {
        method: "POST",
      });

      if (res.ok) {
        navigate("/signin");
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap h-16 align-middle items-center flex justify-center overflow-hidden"
      >
        <img
          src={theme == "dark" ? darkLogo : lightLogo}
          alt="logo"
          className="w-40 -mb-3 bg-[url('../assets/logo_dark.png')]"
        />
      </Link>

      <div className="flex gap-2 md:order-2">
        <div className="self-center p-3">
          <div
            className="h-5"
            //  onClick={() => setIsDarkMode((prev) => !prev)}
          >
            <DarkThemeToggle
              // onClick={handleDarkMode}
              onClick={themeSwitch}
              className="p-0 m-0 focus:ring-0 hover:bg-transparent"
            />
          </div>
        </div>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={currentUser.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Dropdown.Item onClick={() => setOpenModal(true)}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button color="red">Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as="div" active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/add"}>
          <Link to="/add">Add book</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/progress"}>
          <Link to="/progress">On Progress</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/finished"}>
          <Link to="/finished">Finished</Link>
        </Navbar.Link>
      </Navbar.Collapse>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleSignout}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}
