import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdArrowOutward } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";

import Chart from "./Chart";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import AreaChartComponent from "./AreaChartComponent";
import DashboardRecentUsersTable from "./DashboardRecentUsersTable";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function DashboardDash() {
  const [recentBooks, setRecentBooks] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [chartBookData, setChartBookData] = useState([
    { section: "Books", books: 0 },
  ]);
  const [bookPercentage, setBookPercentage] = useState(0);
  const [chartUsersData, setChartUsersData] = useState([
    { section: "Books", users: 0 },
  ]);
  const [usersPercentage, setUsersPercentage] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("/api/books/chartInfo");
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
        const res = await fetch("/api/user/chartInfo");
        const data = await res.json();

        if (res.ok) {
          console.log(data);
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
    const getRecentBooks = async () => {
      try {
        const res = await fetch("/api/books/?limit=5&sortDirection=asc");
        const data = await res.json();

        if (res.ok) {
          setRecentBooks(data.books);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getRecentBooks();
  }, []);

  useEffect(() => {
    if (recentBooks.length > 0) {
      recentBooks.map((book) => {
        getUserEmail(book.user_id).then((email) => {
          setUserEmails((prev) => [...prev, email]);
        });
      });
    }
  }, [recentBooks]);

  const getUserEmail = async (id) => {
    try {
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      return data?.email;
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <BarChartComponent
            title="Title here"
            dataKey="uv"
            chartData={data}
            color="#8e9756"
          />
          {/* <div className="w-full lg:flex">
            <PieChartComponent />
            <AreaChartComponent />
          </div> */}
        </div>
      </div>
      <div className="w-full lg:flex lg:gap-4 lg:flex-row-reverse mb-10">
        <div className="lg:flex-2">
          <PieChartComponent />
        </div>
        <div className="lg:flex-1">
          <AreaChartComponent />
        </div>
      </div>

      {/* <div className="m-1 p-1 sm:m-5 sm:ml-1 sm:p-5 md:ml-3  w-full h-fit lg:w-[55%] bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
        <div className="flex justify-between items-end ml-2 mr-4 mb-2">
          <h1 className="text-2xl font-semibold">Recent Books</h1>
          <Link
            to="/dashboard?tab=books"
            className="text-teal-600 dark:text-teal-400 flex gap-2 items-center"
          >
            SEE ALL <MdArrowOutward />
          </Link>
        </div>
        <div className="overflow-x-auto border-x-2 border-gray-300 dark:border-gray-600 rounded-xl">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-gray-100">
                Book Cover
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Title</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Author</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Language</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">State</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Reader</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Last Update
              </Table.HeadCell>{" "}
            </Table.Head>
            <Table.Body className="divide-y">
              {recentBooks.length != 0 &&
                recentBooks.map((book, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <Link to={`/book/${book._id}`}>
                        <div className="bg-slate-300 dark:bg-slate-500 max-w-12 h-14 flex">
                          {book.img ? (
                            <img
                              src={
                                book.img ||
                                "https://static.wikia.nocookie.net/souo/images/4/47/Old_Book.jpg/revision/latest/scale-to-width-down/323?cb=20181030100841"
                              }
                              alt={book.title}
                              className="h-fit w-auto my-auto"
                            />
                          ) : (
                            <div className="text-[9px] leading-4 text-opacity-80 text-center mx-auto text-zinc-700 dark:text-zinc-300 p-1">
                              NO
                              <br />
                              COVER
                              <br />
                              IMAGE
                            </div>
                          )}
                        </div>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/book/${book._id}`}>{book.title}</Link>
                    </Table.Cell>
                    <Table.Cell>{book.author}</Table.Cell>
                    <Table.Cell>{book?.language || "-"}</Table.Cell>
                    <Table.Cell>
                      <h3
                        className={`font-semibold w-20 ${
                          book.state == "onProgress"
                            ? "text-blue-700 dark:text-blue-500"
                            : "text-green-600 dark:text-green-500"
                        }`}
                      >
                        {book.state == "onProgress"
                          ? "On Progress"
                          : "Finished"}
                      </h3>
                    </Table.Cell>
                    <Table.Cell>{userEmails[index] || "-"}</Table.Cell>
                    <Table.Cell>
                      <h3 className="w-32">
                        {new Date(book?.updatedAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </h3>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          {recentBooks.length == 0 && (
            <div className="text-xl font-semibold text-center py-2 text-gray-600 dark:text-gray-400 ">
              No Book Found
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
