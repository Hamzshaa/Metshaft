import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsersSkeletonLoading from "../SkeletonLoadingComponents/UsersSkeletonLoading";
const options = { year: "numeric", month: "long", day: "numeric" };

export default function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    users.map((user) => {
      const fetchBooksInfo = async () => {
        try {
          const res = await fetch(`/api/books/info/${user._id}`);
          const data = await res.json();
          if (res.ok) {
            return data;
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchBooksInfo();
    });
  }, [users]);

  if (loading) {
    return <UsersSkeletonLoading />;
  }

  return (
    <div className="md:mx-auto md:w-[var(--dashboard-width)]">
      <h2 className="font-semibold text-3xl text-center my-8">Users</h2>
      <div className="w-[98%] mx-auto bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
        <div className="flex justify-between items-end ml-2 mr-4 mb-2">
          <h1 className="text-2xl font-semibold">Recent Users</h1>
        </div>
        <div className="overflow-x-scroll rounded-md">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-gray-100 text-center">
                <h3 className="w-20">User Image</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Email</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Role</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-24">On Progress Books</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Finished Books
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Total Books
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-20">Created At</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-20">Last Update</h3>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.length != 0 &&
                users.map((user, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <Link
                        to={`/profile/${user._id}`}
                        className="flex w-fit mx-auto"
                      >
                        <img
                          src={user?.profilePicture}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <h3
                        className={`font-semibold ${
                          user.isAdmin == true
                            ? "text-green-700 dark:text-green-600 bg-green-300 dark:bg-green-300 px-1 w-fit rounded-sm"
                            : ""
                        }`}
                      >
                        {user.isAdmin == true ? "Admin" : "User"}
                      </h3>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {user.bookInfo?.progress}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {user.bookInfo?.finished}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {user.bookInfo?.total}
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-32">
                        {new Date(user.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </h3>
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-32">
                        {new Date(user.updatedAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </h3>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      {!loading && users.length == 0 && (
        <div className="text-xl font-semibold text-center py-2 text-gray-600 dark:text-gray-400">
          No User Found
        </div>
      )}
    </div>
  );
}
