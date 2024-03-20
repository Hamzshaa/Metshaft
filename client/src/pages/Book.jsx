import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  processFailure,
  processStart,
  processSuccess,
} from "../redux/book/bookSlice";
import { GiBookmarklet, GiDiceEightFacesEight } from "react-icons/gi";
import { FaPenNib } from "react-icons/fa";
import { IoPrintSharp } from "react-icons/io5";
import { BsCalendar2DateFill, BsTranslate } from "react-icons/bs";
import { LiaLanguageSolid } from "react-icons/lia";
import { IoIosPerson } from "react-icons/io";
import { Button } from "flowbite-react";

export default function Book() {
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  console.log(book);

  useEffect(() => {
    const getBook = async () => {
      dispatch(processStart());
      try {
        const res = await fetch(`/api/books/?bookId=${bookId}`);
        const data = await res.json();

        if (res.ok) {
          setBook(data.books[0]);
          dispatch(processSuccess());
        } else {
          console.log(data.message);
          dispatch(processFailure(data.message));
        }
      } catch (error) {
        console.log(error);
        dispatch(processFailure(error.message));
      }
    };

    getBook();
  }, [bookId, dispatch]);

  if (!book) {
    return;
  }

  return (
    <div className="mx-4  md:mx-5 my-10 min-h-[var(--body-height)] py-10">
      <div className="w-fit sm:w-[640px] md:max-w-[900px] md:w-[750px] mx-auto gap-4 py-5 px-8 sm:px-10 border rounded-lg shadow-xl dark:bg-zinc-800 dark:bg-opacity-50 dark:border-opacity-50 dark:border-slate-600">
        <div className="max-w-[480px] sm:max-w-[700px] md:max-w-[900px] mx-auto md:flex md:gap-4 md:items-center">
          {book.img ? (
            <div className="w-full max-w-[360px] sm:max-w-[400px] mx-auto md:w-[300px] order-2">
              <img src={book?.img} alt={book.title} className="cover" />
            </div>
          ) : (
            <div className="order-2 mx-auto text-slate-600 dark:text-slate-500 flex flex-col gap-4 items-center">
              <p className="">No cover image</p>
              <Link to={`/edit/${bookId}`}>
                <Button
                  outline
                  size="xs"
                  className="text-center"
                  gradientDuoTone="tealToLime"
                >
                  Add image
                </Button>
              </Link>
            </div>
          )}
          <div className=" order-1">
            <div className="max-w-[480px] mx-auto mt-5">
              <h1 className="text-3xl md:text-4xl">{book.title}</h1>
              <div className="flex gap-4 items-center mt-2">
                <h3 className="text-2xl">{book.author}</h3>
                <div
                  className={`${
                    book.state == "onProgress" ? "bg-blue-400" : "bg-green-400"
                  } rounded-md text-[10px] md:text-sm text-slate-50 text-center px-1 py-[2px]`}
                >
                  {book.state == "onProgress" ? "On progress" : "Finished"}
                </div>
              </div>
              <div className="sm:max-w-[360px] flex gap-2 mt-5 text-[12px] md:text-[14px] border-y dark:border-0 py-2 px-4">
                <div className="font-semibold text-slate-900 dark:text-slate-200 flex-1 flex flex-col gap-2 ml-2">
                  <p className="flex items-center gap-1">
                    <GiBookmarklet />
                    Page
                  </p>
                  <p className="flex items-center gap-1">
                    <GiDiceEightFacesEight />
                    Genre
                  </p>
                  <p className="flex items-center gap-1">
                    <FaPenNib />
                    Author&apos;s nationality
                  </p>
                  <p className="flex items-center gap-1">
                    <IoPrintSharp />
                    Publisher
                  </p>
                  <p className="flex items-center gap-1">
                    <BsCalendar2DateFill />
                    Publication Date
                  </p>
                  <p className="flex items-center gap-1">
                    <LiaLanguageSolid />
                    Language
                  </p>
                  <p className="flex items-center gap-1">
                    <BsTranslate />
                    Translated to
                  </p>
                  <p className="flex items-center gap-1">
                    <IoIosPerson />
                    Translator
                  </p>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[12px]  md:text-[14px] flex-2 flex flex-col gap-2 min-w-[100px]">
                  <p className="">{book.page || "-"}</p>

                  <p className="">{book.genre || "-"}</p>
                  <p className="">{book.nationality || "-"}</p>
                  <p className="">{book.publisher || "-"}</p>
                  <p className="">{book.published_date || "-"}</p>
                  <p className="">{book.language || "-"}</p>
                  <p className="">{book.translated_to || "-"}</p>
                  <p className="">{book.translator || "-"}</p>
                </div>
              </div>
            </div>
            <div className="max-w-[480px] sm:max-w-[560px] mt-5">
              <p className="text-sm">
                Created at:{" "}
                <span className="font-thin text-xs">
                  {new Date(book.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="text-sm">
                Last update:{" "}
                <span className="font-thin text-xs">
                  {new Date(book.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
