import { useState } from "react";

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);

  const notification = [
    "notification1",
    "notification2",
    "notification3",
    "notification4",
    "notification5",
    "notification6",
    "notification7",
    "notification8",
    "notification9",
    "notification10",
    "notification11",
  ];

  return (
    <div className=""></div>
    // <div className="absolute h-[var(--body-height)] w-full bg-blue-800 opacity-80 left-0 bottom-0 z-40">
    //   <div
    //     className={`${
    //       true ? "block" : "hidden"
    //     } w-full h-[var(--body-height)] fixed bg-opacity-50 bottom-0 z-50 overflow-y-scroll sm:w-80 sm:right-0 sm:bg-opacity-100 sm:bg-black`}
    //   >
    //     <div className="flex justify-between px-5">
    //       <div className=""></div>
    //       <div className="">Notification</div>
    //       <div className="" onClick={() => showNotification(false)}>
    //         X
    //       </div>
    //     </div>
    //     {notification.map((item, index) => (
    //       <div className="py-5" key={index}>
    //         <hr />
    //         <div className="">{item}</div>
    //       </div>
    //     ))}
    //     <hr />
    //   </div>
    // </div>
  );
}
