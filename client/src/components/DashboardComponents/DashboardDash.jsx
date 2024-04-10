import { useEffect, useState } from "react";

import { GiBookshelf } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";

import Chart from "../Charts/LineChartComponent";
import BarChartComponent from "../Charts/BarChartComponent";
import PieChartComponent from "../Charts/PieChartComponent";
import AreaChartComponent from "../Charts/AreaChartComponent";
import DashboardRecentUsersTable from "./DashboardRecentUsersTable";

export default function DashboardDash() {
  const [chartBookData, setChartBookData] = useState([
    { section: "Books", books: 0 },
  ]);
  const [bookPercentage, setBookPercentage] = useState(0);
  const [barChartData, setBarChartData] = useState([]);
  const [chartUsersData, setChartUsersData] = useState([
    { section: "Books", users: 0 },
  ]);
  const [usersPercentage, setUsersPercentage] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);
  const [areaChartData, setAreaChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("/api/charts/chartInfo/books/lineChart");
        const data = await res.json();

        if (res.ok) {
          setChartBookData(data.chartData);
          setBookPercentage(data.percentage);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("/api/charts/chartInfo/users/lineChart");
        const data = await res.json();

        if (res.ok) {
          setChartUsersData(data.chartData);
          setUsersPercentage(data.percentage);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const res = await fetch("/api/charts/chartInfo/barChart");
        const data = await res.json();

        if (res.ok) {
          setBarChartData(data.barChartData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBarChartData();
  }, []);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const res = await fetch("/api/charts/chartInfo/pieChart");
        const data = await res.json();

        if (res.ok) {
          setPieChartData(data.pieChartData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPieChartData();
  }, []);

  useEffect(() => {
    const fetchAreaChartData = async () => {
      try {
        const res = await fetch("/api/charts/chartInfo/areaChart");
        const data = await res.json();

        if (res.ok) {
          console.log(data);
          setAreaChartData(data.areaChartData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAreaChartData();
  }, []);

  return (
    <div className="md:h-[var(--body-height)] md:overflow-y-scroll overflow-x-hidden flex flex-col lg:flex-co lg:w-[var(--dashboard-width)] pr-2 md:pr-10 ">
      <div className="lg:flex">
        <DashboardRecentUsersTable />

        <div className="w-full mx-auto">
          <div className="w-full mx-auto mt-4 flex flex-col gap-4 md:flex-row md:gap-2 md:mx-2">
            <Chart
              color="#8884db"
              icon={<GiBookshelf />}
              title="Total Books"
              number={chartBookData[6] ? chartBookData[6].books : "0"}
              dataKey="books"
              percentage={bookPercentage}
              chartData={chartBookData}
              link="/dashboard?tab=books"
            />
            <Chart
              color="#fca80b"
              icon={<FaUsers />}
              title="Total Users"
              number={chartUsersData[6] ? chartUsersData[6].users : "0"}
              dataKey="users"
              percentage={usersPercentage}
              chartData={chartUsersData}
              link="/dashboard?tab=users"
            />
          </div>
          <div className="ml-2 w-full">
            <BarChartComponent chartData={barChartData} />
          </div>
        </div>
      </div>
      <div className="w-full lg:flex lg:gap-4 lg:flex-row-reverse mb-10 ml-2">
        <div className="lg:flex-2">
          <PieChartComponent data={pieChartData} />
        </div>
        <div className="lg:flex-1">
          <AreaChartComponent data={areaChartData} />
        </div>
      </div>
    </div>
  );
}
