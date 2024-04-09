import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DashboardRecentUsersTable() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    const fetchRecentUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user?limit=5");
        const data = await res.json();

        if (res.ok) {
          setRecentUsers(data.users);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
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

      {loading && (
        <div className="flex flex-col gap-6 mt-8">
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <div className="flex flex-col gap-2 mx-3 mb-0" key={index}>
                <div className="flex justify-between items-end">
                  <div className="flex gap-3 items-center ">
                    <div className="w-16 h-16 md:w-10 md:h-10 rounded-full object-cover max-w-16 bg-gray-300 dark:bg-gray-400 animate-pulse"></div>
                    <div className="flex flex-col">
                      <div className="w-32 h-5 bg-gray-300 dark:bg-gray-400 animate-pulse rounded-sm"></div>
                      <div className="w-40 h-3 bg-gray-300 dark:bg-gray-500 animate-pulse mt-3 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="pb-2">
                    <div className="w-20 h-2 bg-gray-300 dark:bg-gray-500 animate-pulse rounded-sm"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="flex flex-col gap-6 mx-3 mb-4 mt-8">
        {recentUsers.length != 0 &&
          recentUsers.map((user, index) => (
            <div className="flex justify-between items-end" key={index}>
              <div className="flex gap-3 items-center ">
                <Link to={`/profile/${user._id}`} className="flex w-fit">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="w-16 h-16 md:w-10 md:h-10 rounded-full object-cover max-w-16"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl md:text-md">
                    {user?.name}
                  </span>
                  <span className="text-[12px] md:text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
              </div>
              <div className="pb-2">
                <h3 className="font-semibold text-[12px] md:text-xs text-gray-600 dark:text-gray-400">
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
