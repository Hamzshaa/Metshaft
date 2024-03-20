import { Button, Modal, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  processFailure,
  processStart,
  processSuccess,
} from "../redux/book/bookSlice";

export default function FinishedComponent() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState(null);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.book);

  useEffect(() => {
    const getBooks = async () => {
      dispatch(processStart());
      try {
        const res = await fetch(
          `/api/books/?state=finished&userId=${currentUser._id}`
        );
        const data = await res.json();

        if (!res.ok) {
          dispatch(processFailure(data.message));
          console.log(data.message);
          return;
        }
        setBooks(data.books);
        dispatch(processSuccess());
      } catch (error) {
        dispatch(processFailure(error.message));
        console.log(error);
      }
    };

    getBooks();
  }, [currentUser._id, dispatch]);

  const handleDelete = async () => {
    dispatch(processStart());
    try {
      const res = await fetch(`/api/books/delete/${bookId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setBooks((prev) => prev.filter((book) => book._id !== bookId));

        dispatch(processSuccess(data));
      } else {
        dispatch(processFailure(data.message));
      }
    } catch (error) {
      dispatch(processFailure(error.message));
      console.log(error.message);
    } finally {
      setBookId(null);
    }
  };

  if (loading && books.length == 0) {
    return (
      <div className="text-center mt-[30vh]">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  if (!loading && books.length == 0) {
    return (
      <div className="text-center mt-[20vh] text-2xl">
        On Progress list is currently empty
      </div>
    );
  }

  return (
    <div className="overflow-scroll mx-5 my-5 md:m-10">
      <Table hoverable>
        <Table.Head className="bg-red-800">
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell className="text-center">Starting date</Table.HeadCell>
          <Table.HeadCell>Book Cover</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>page</Table.HeadCell>
          <Table.HeadCell>genre</Table.HeadCell>
          <Table.HeadCell>Language</Table.HeadCell>
          <Table.HeadCell>Translated to</Table.HeadCell>
          <Table.HeadCell>Translator</Table.HeadCell>
          <Table.HeadCell>Author&apos;s nationality</Table.HeadCell>
          <Table.HeadCell>Publisher</Table.HeadCell>
          <Table.HeadCell>Published Date</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Remove</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {books &&
            books.length > 0 &&
            books.map((book, index) => (
              <Table.Row
                key={book.title}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="w-fit">
                  <div className="w-[100px] ">
                    {new Date(book.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="bg-slate-300 dark:bg-slate-500 w-12 h-14 flex">
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
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.title}
                </Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell className="text-center">
                  {book.page || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {book.genre || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {book.language || book.original_language || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {book.translated_to || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {book.translator || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {book.nationality || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {book.publisher || "-"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <div className="w-[120px]">
                    {book.published_date
                      ? new Date(book.published_date).toLocaleDateString(
                          "en-US",
                          options
                        )
                      : "-"}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/edit/${book._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <div
                    className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                    onClick={() => setBookId(book._id)}
                  >
                    Remove
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      <Modal show={bookId} size="md" onClose={() => setBookId(null)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this book?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setBookId(null)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
