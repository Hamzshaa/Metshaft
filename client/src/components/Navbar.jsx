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
import { useState } from "react";

export default function NavbarComponent() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

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
      <Link to="/" className="self-center whitespace-nowrap ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6FIP9j5d38NvEKOOD4lsA0pJmtLR6U3PW0wftHoQXCj_ZBjuTK-pOpSmuxTOxOgFCRxA&usqp=CAU"
          alt="logo"
          className="w-12"
        />
      </Link>

      {/* <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="w-14 h-10 lg:hidden " color="gray" pill>
        <AiOutlineSearch className="w-5 h-5" />
      </Button> */}

      <div className="flex gap-2 md:order-2">
        <div className="self-center p-3">
          <DarkThemeToggle className=" p-0 m-0 focus:ring-0 hover:bg-transparent" />
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
