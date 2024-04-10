import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "../redux/notification/notificationSlice";
import NotificationMessageCard from "./NotificationMessageCard";
import { useEffect, useState } from "react";

export default function Notification() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { notification } = useSelector((state) => state.notification);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await fetch(`/api/user/notification/${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setNotifications(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNotification();
  }, [currentUser._id, notification]);

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
          {notifications &&
            notifications.length > 0 &&
            notifications.map((item, index) => (
              <NotificationMessageCard
                key={index}
                title={item.title}
                message={item.message}
                date={item.date}
                border={index !== notifications.length - 1}
              />
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
