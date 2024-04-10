import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookSkeletonLoading from "../SkeletonLoadingComponents/BookSkeletonLoading";
const options = { year: "numeric", month: "long", day: "numeric" };

export default function DashboardBooks() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/books/");
        const data = await res.json();

        if (res.ok) {
          setBooks(data.books);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setUsers([]);
    if (books.length > 0) {
      for (let i = 0; i < books.length; i++) {
        fetchUsers(books[i].user_id).then((user) => {
          setUsers((prev) => [...prev, user]);
        });
      }
    }
  }, [books]);

  const fetchUsers = async (userId) => {
    try {
      const res = await fetch(`/api/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        const user = {
          profilePicture: data.profilePicture,
          email: data.email,
          _id: data._id,
        };
        return user;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <BookSkeletonLoading />;
  }

  return (
    <div className="md:mx-auto md:w-[var(--dashboard-width)]">
      <h2 className="font-semibold text-3xl text-center my-8">Books</h2>
      <div className="w-[98%] mx-auto bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
        <div className="flex justify-between items-end ml-2 mr-4 mb-2">
          <h1 className="text-2xl font-semibold">Recent Book</h1>
        </div>
        <div className="overflow-x-scroll rounded-md">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Book Cover
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Title</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Author</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Reader</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Page</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Genre</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Author&apos;s nationality
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">language</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                translated to
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                translator
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">state</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Publisher</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Published Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-20">Created At</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-20">Last Update</h3>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {books?.length > 0 &&
                books.map((book, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
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
                    <Table.Cell>
                      <Link
                        to={`/profile/${book.user_id}`}
                        className="flex gap-2 mr-1"
                      >
                        <img
                          src={users[index]?.profilePicture}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        {users[index]?.email}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.page || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.genre || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.nationality || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.language || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <h3 className="w-24">{book?.translated_to || "-"}</h3>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.translator || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.state || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.publisher || "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {book?.published_date ? (
                        <h3 className="w-32">
                          {new Date(book?.date).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </h3>
                      ) : (
                        "-"
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-32">
                        {new Date(book?.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </h3>
                    </Table.Cell>
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
        </div>
      </div>
      {!loading && books?.length == 0 && (
        <div className="text-xl font-semibold text-center py-2 text-gray-600 dark:text-gray-400">
          No Book Found
        </div>
      )}
    </div>
  );
}
