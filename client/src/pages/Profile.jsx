import { Card, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [userId]);

  console.log(user);

  return (
    <div className="h-[var(--body-height)]">
      <Card className="max-w-sm sm:max-w-md mx-auto mt-20">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Books
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {user?.isAdmin ? "Remove Admin" : "Make Admin"}
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt="Bonnie image"
            height="96"
            src={user?.profilePicture}
            width="96"
            className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.email}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.isAdmin ? "Admin" : "User"}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              {/* Add friend */}
              {user?.bookInfo?.total} books
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
