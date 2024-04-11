import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementUnseenNotifications } from "../redux/notification/notificationSlice";

export default function NotificationMessageCard({
  id,
  isSeen,
  title,
  message,
  date,
  border,
  handleDelete,
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isSeenClicked, setIsSeenClicked] = useState(isSeen);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await fetch(
          `/api/user/notification/${currentUser?._id}/${id}`
        );
        const data = await res.json();

        if (res.ok) {
          setIsSeenClicked(data.isSeen);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNotification();
  }, [currentUser?._id, id, isSeen]);

  const handleMarkAsRead = async () => {
    try {
      const res = await fetch(`/api/user/notification/markAsRead/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        setIsSeenClicked(true);
        dispatch(decrementUnseenNotifications());
      } else {
        console.log("ERROR: ", data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <div
        className={`font-semibold ${
          isSeenClicked
            ? "text-gray-500 dark:text-gray-00"
            : "text-gray-900 dark:text-gray-200"
        } `}
      >
        {title}
      </div>
      <div
        className={`text-[12px] ${
          isSeenClicked
            ? "text-gray-500 dark:text-gray-400"
            : "text-gray-900 dark:text-gray-200"
        } mt-1`}
      >
        {message}
      </div>
      <div className="flex justify-between mr-2 mt-3 items-end">
        <span
          className={`text-[10px] ${
            isSeenClicked
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-900 dark:text-gray-200"
          } `}
        >
          {date}
        </span>
        <span
          className={`${
            isSeenClicked
              ? "text-red-500 dark:text-red-600"
              : "text-gray-600 dark:text-gray-400"
          }  hover:underline cursor-pointer font-medium text-sm`}
          onClick={isSeenClicked ? () => handleDelete(id) : handleMarkAsRead}
        >
          {isSeenClicked ? "Delete" : "Mark as read"}
        </span>
      </div>
      {border && (
        <div className="bg-gray-300 dark:bg-gray-500 h-0.5 w-1/2 md:w-1/4 mx-auto mt-5 mb-3" />
      )}
    </div>
  );
}

NotificationMessageCard.propTypes = {
  id: propTypes.string,
  title: propTypes.string,
  message: propTypes.string,
  date: propTypes.string,
  isSeen: propTypes.bool,
  border: propTypes.bool,
  handleDelete: propTypes.func,
};
