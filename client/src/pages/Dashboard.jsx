import { useLocation } from "react-router-dom";
import Sidebar from "../components/DashboardSidebar";
import { useEffect, useState } from "react";
import DashboardProfile from "../components/DashboardProfile";
import DashboardDash from "../components/DashboardDash";

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
    </div>
  );
}
