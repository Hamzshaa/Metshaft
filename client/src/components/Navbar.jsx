import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function NavbarComponent() {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2 h-[64px]">
      <Link to="/" className="self-center whitespace-nowrap ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6FIP9j5d38NvEKOOD4lsA0pJmtLR6U3PW0wftHoQXCj_ZBjuTK-pOpSmuxTOxOgFCRxA&usqp=CAU"
          alt="logo"
          className="w-12"
        />
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="w-14 h-10 lg:hidden " color="gray" pill>
        <AiOutlineSearch className="w-5 h-5" />
      </Button>

      <div className="flex gap-2 md:order-2">
        <div className="self-center p-3">
          <DarkThemeToggle className=" p-0 m-0 focus:ring-0 hover:bg-transparent" />
        </div>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={currentUser.profilePic} rounded />}
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
            <Dropdown.Item>Sign out</Dropdown.Item>
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
    </Navbar>
  );
}
