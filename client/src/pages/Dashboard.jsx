import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/DashboardComponents/DashboardSidebar";
import DashboardProfile from "../components/DashboardComponents/DashboardProfile";
import DashboardDash from "../components/DashboardComponents/DashboardDash";
import DashboardUsers from "../components/DashboardComponents/DashboardUsers";
import DashboardBooks from "../components/DashboardComponents/DashboardBooks";
import NotifyUsersPage from "../components/DashboardComponents/NotifyUsersPage";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className=" flex flex-col md:flex-row min-h-[var(--body-height)] ">
      <div className="md:w-64 w-full">
        <Sidebar />
      </div>
      {tab === "profile" && <DashboardProfile />}
      {(tab === "dashboards" || !tab) && <DashboardDash />}
      {tab === "users" && <DashboardUsers />}
      {tab === "books" && <DashboardBooks />}
      {tab === "notify" && <NotifyUsersPage />}
    </div>
  );
}
