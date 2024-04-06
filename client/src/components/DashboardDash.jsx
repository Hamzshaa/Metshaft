import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdArrowOutward } from "react-icons/md";

export default function DashboardDash() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
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
      console.log(data.email);
      return data?.email;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="md:h-[var(--body-height)] md:overflow-y-scroll overflow-x-hidden flex flex-col lg:flex-row lg:w-[var(--dashboard-width)] pr-2 md:pr-10">
      <div className="m-1 p-1 sm:m-5 sm:ml-1 sm:p-5 md:ml-3 w-full h-fit lg:w-[45%] bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
        <div className="flex justify-between items-end ml-2 mr-4 mb-2">
          <h1 className="text-2xl font-semibold">Recent Users</h1>
          <Link
            to="/dashboard?tab=users"
            className="text-teal-600 dark:text-teal-400 flex gap-2 items-center"
          >
            SEE ALL <MdArrowOutward />
          </Link>
        </div>
        <div className="overflow-x-auto border-x-2 border-gray-300 dark:border-gray-600 rounded-xl">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-gray-100">
                User Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Email</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Created At
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Role</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {recentUsers.length != 0 &&
                recentUsers.map((user, index) => (
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
                            ? "text-green-700 dark:text-green-600 bg-green-300 dark:bg-green-300 px-1 rounded-sm"
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
          {recentUsers.length == 0 && (
            <div className="text-xl font-semibold text-center py-2 text-gray-600 dark:text-gray-400 ">
              No User Found
            </div>
          )}
        </div>
      </div>

      <div className="m-1 p-1 sm:m-5 sm:ml-1 sm:p-5 md:ml-3  w-full h-fit lg:w-[55%] bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
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
      </div>
    </div>
  );
}
