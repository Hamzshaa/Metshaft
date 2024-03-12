import { Button, DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function NavbarComponent() {
  const path = useLocation().pathname;

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
        {/* <Button className="w-12 h-10  sm:inline" color="gray" pill> */}
        <div className="self-center p-3">
          {/* <FaMoon /> */}
          <DarkThemeToggle className=" p-0 m-0 focus:ring-0 hover:bg-transparent" />
        </div>
        {/* </Button> */}
        <Link to="/signin">
          <Button color="red">Sign In</Button>
        </Link>
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

    // <Navbar rounded className="m-3 border-b-2">
    //   <Navbar.Brand>Trident Logo</Navbar.Brand>
    //   <form>
    //     <TextInput
    //       type="text"
    //       placeholder="Search..."
    //       rightIcon={AiOutlineSearch}
    //       className="hidden md:inline"
    //     />
    //   </form>
    //   <Button type="submit" className="w-16 h-10 md:hidden " color="gray" pill>
    //     <AiOutlineSearch className="h-5 w-5" />
    //   </Button>
    //   <div className=" flex md:order-2 ">
    //     <Dropdown
    //       arrowIcon={false}
    //       inline
    //       label={
    //         <Avatar
    //           alt="User settings"
    //           img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    //           rounded
    //         />
    //       }
    //     >
    //       <Dropdown.Header>
    //         <span className="block text-sm">Bonnie Green</span>
    //         <span className="block truncate text-sm font-medium">
    //           name@flowbite.com
    //         </span>
    //       </Dropdown.Header>
    //       <Dropdown.Item>Dashboard</Dropdown.Item>
    //       <Dropdown.Item>Settings</Dropdown.Item>
    //       <Dropdown.Item>Earnings</Dropdown.Item>
    //       <Dropdown.Divider />
    //       <Dropdown.Item>Sign out</Dropdown.Item>
    //     </Dropdown>
    //     <Navbar.Toggle />
    //   </div>

    //   <Navbar.Collapse>
    //     <Navbar.Link to="/" active>
    //       {" "}
    //       Home
    //     </Navbar.Link>

    //     <Navbar.Link to="/">Add book</Navbar.Link>

    //     <Navbar.Link to="/">On Progress Books</Navbar.Link>

    //     <Navbar.Link to="/">Finished Books</Navbar.Link>
    //   </Navbar.Collapse>
    // </Navbar>
  );
}
