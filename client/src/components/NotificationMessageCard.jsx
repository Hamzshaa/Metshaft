import propTypes from "prop-types";

export default function NotificationMessageCard({
  title,
  message,
  date,
  border,
}) {
  return (
    <div className="">
      <div className="font-semibold dark:text-gray-300">{title}</div>
      <div className="text-[12px] text-gray-600 dark:text-gray-400 mt-1">
        {message}{" "}
      </div>
      <div className="flex justify-between mr-2 mt-3 items-end">
        <span className="text-[10px] dark:text-gray-400">{date}</span>
        <span className="text-gray-600 dark:text-gray-400 hover:underline font-medium text-sm">
          Mark as read
        </span>
      </div>
      {border && (
        <div className="bg-gray-300 dark:bg-gray-500 h-0.5 w-1/2 md:w-1/4 mx-auto mt-5 mb-3" />
      )}
    </div>
  );
}

NotificationMessageCard.propTypes = {
  title: propTypes.string,
  message: propTypes.string,
  date: propTypes.string,
  border: propTypes.bool,
};
