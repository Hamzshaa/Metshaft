import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DashboardRecentUsersTable() {
  const [recentUsers, setRecentUsers] = useState([]);
  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await fetch("/api/user?limit=5");
        const data = await res.json();

        if (res.ok) {
          setRecentUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentUsers();
  }, []);

  return (
    <div className="m-1 p-1 sm:m-5 sm:ml-1 sm:p-5 md:ml-3 w-full h-fit md:w-[600px] bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
      <div className="flex justify-between items-end ml-2 mr-4 mb-2">
        <h1 className="text-2xl font-semibold">Recent Users</h1>
        <Link
          to="/dashboard?tab=users"
          className="text-teal-600 dark:text-teal-400 flex gap-2 items-center"
        >
          SEE ALL <MdArrowOutward />
        </Link>
      </div>
      <div className="flex flex-col gap-6 mx-3 mb-4 mt-8">
        {recentUsers.length != 0 &&
          recentUsers.map((user, index) => (
            <div className="flex justify-between items-end" key={index}>
              <div className="flex gap-3 items-center">
                <Link to={`/profile/${user._id}`} className="flex w-fit">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="w-16 h-16 md:w-10 md:h-10 rounded-full"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl md:text-md">
                    {user?.name}
                  </span>
                  <span className="text-sm md:text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
              </div>
              <div className="pb-2">
                <h3 className="font-semibold text-sm md:text-xs text-gray-600 dark:text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
