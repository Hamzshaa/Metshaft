import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "../redux/notification/notificationSlice";
import NotificationMessageCard from "./NotificationMessageCard";

export default function Notification() {
  const dispatch = useDispatch();

  const { notification } = useSelector((state) => state.notification);

  const notification2 = [
    {
      title: "Yehone title ezihgar",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi saepe officia ipsam nulla natus vitae quos sit alias magni soluta!",
      date: "March 23, 2022",
    },
    {
      title: "Yehone title ezihgar",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi saepe officia ipsam nulla natus vitae quos sit alias magni soluta!",
      date: "March 23, 2022",
    },
    {
      title: "Yehone title ezihgar",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi saepe officia ipsam nulla natus vitae quos sit alias magni soluta!",
      date: "March 23, 2022",
    },
  ];

  return (
    <div className="">
      <Modal
        show={notification}
        position={"center"}
        // onClose={() => setOpenModal(false)}
        onClose={() => dispatch(toggleNotification())}
      >
        <Modal.Header>Notifications</Modal.Header>
        <Modal.Body>
          {notification2.map((item, index) => (
            <NotificationMessageCard
              key={index}
              title={item.title}
              message={item.message}
              date={item.date}
              border={index !== notification2.length - 1}
            />
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
