import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
const options = { year: "numeric", month: "long", day: "numeric" };

export default function DashboardUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user?limit=5");
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

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
              <Table.HeadCell className="bg-gray-100">
                User Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Email</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Role</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                On Progress Books
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
                      <img
                        src={user?.profilePicture}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <h3 className="w-32">
                        {new Date(user.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </h3>
                    </Table.Cell>
                    <Table.Cell>
                      <h3
                        className={`font-semibold ${
                          user.isAdmin == true
                            ? "text-green-600 dark:text-green-500"
                            : ""
                        }`}
                      >
                        {user.isAdmin == true ? "Admin" : "User"}
                      </h3>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      {users.length == 0 && (
        <div className="text-xl font-semibold text-center py-2 text-gray-600 dark:text-gray-400">
          No User Found
        </div>
      )}
    </div>
  );
}
