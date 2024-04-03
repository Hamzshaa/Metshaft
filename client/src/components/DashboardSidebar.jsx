import { BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Button, Modal, Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabValue = searchParams.get("tab");
    if (tabValue) {
      setTab(tabValue);
    }
    console.log("dkajf");
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("api/auth/signout", {
        method: "POST",
      });

      if (res.ok) {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setOpenModal(false);
    }
  };

  console.log(tab);
  return (
    <Sidebar className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup class="flex flex-col gap-2">
          {currentUser.isAdmin && (
            <Link to="/dashboard?">
              <Sidebar.Item
                active={tab === "dashboard" || !tab}
                icon={MdDashboard}
                labelColor="dark"
                as="div"
                onClick={() => setTab("")}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={BsPerson}
              label={currentUser.isAdmin == true ? "admin" : "user"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            active={tab === "logout"}
            icon={FiLogOut}
            labelColor="dark"
            onClick={() => setOpenModal(true)}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

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
    </Sidebar>
  );
}
