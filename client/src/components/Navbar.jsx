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
import { toggleTheme } from "../redux/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { useState } from "react";

import darkLogo from "../assets/logo_dark.png";
import lightLogo from "../assets/logo_light.png";
import { toggleNotification } from "../redux/notification/notificationSlice";

export default function NavbarComponent() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
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

  const notification = 0;

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
          <div className="h-5" onClick={() => dispatch(toggleTheme())}>
            <DarkThemeToggle
              // onClick={() => dispatch(toggleTheme())}
              className="p-0 m-0 focus:ring-0 hover:bg-transparent"
            />
          </div>
        </div>
        {currentUser ? (
          <div className="my-auto relative">
            {notification > 0 && (
              <div className="bg-red-500 px-1 text-xs text-center w-fit rounded-full absolute z-10 -right-1">
                {notification}
              </div>
            )}
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

              {currentUser.isAdmin === true && (
                <Link to={"/dashboard"}>
                  <Dropdown.Item icon={MdDashboard}>Dashboard</Dropdown.Item>
                </Link>
              )}
              <DropdownDivider />

              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item icon={IoPerson}>Profile</Dropdown.Item>
              </Link>

              <DropdownDivider />

              <div onClick={() => dispatch(toggleNotification())}>
                <Dropdown.Item icon={IoIosNotifications} className="flex">
                  Notification{" "}
                  {notification > 0 && (
                    <div className="flex-1 text-right flex justify-end">
                      <h3 className="bg-red-500 w-fit rounded-full px-[6px]">
                        {notification}
                      </h3>
                    </div>
                  )}
                </Dropdown.Item>
              </div>
              <DropdownDivider />
              <Dropdown.Item
                icon={VscSignOut}
                onClick={() => setOpenModal(true)}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
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
