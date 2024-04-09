import { Button, Card, Dropdown, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [userId]);

  const handleMakeAdmin = async () => {
    const res = await fetch(`/api/user/grantRevokeAdmin/${userId}`, {
      method: "PUT",
    });
    // const data = await res.json();
    if (res.ok) {
      setUser((prev) => ({
        ...prev,
        isAdmin: !prev.isAdmin,
      }));
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/user/delete/${userId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      window.location.replace("/dashboard?tab=users");
    }
  };

  return (
    <div className="h-[var(--body-height)]">
      <Card className="max-w-sm sm:max-w-md mx-auto mt-20">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <Dropdown.Item>
              <Link
                to={`/books/total/${user?._id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Books
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleMakeAdmin}
              >
                {user?.isAdmin ? "Remove Admin" : "Make Admin"}
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(true)}
              >
                Delete
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          {/* https://i.pravatar.cc/96 */}
          <img
            alt="Bonnie image"
            // height="96"
            src={
              user?.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            // width="96"
            className="mb-3 rounded-full shadow-lg w-24 h-24 object-cover"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.email}
          </h5>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user?.name}
            </span>

            <span className="text-sm bg-gray-500 dark:bg-gray-400 h-1 w-1 rounded-full "></span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user?.isAdmin ? "Admin" : "User"}
            </span>
          </div>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Link
              to={`/books/total/${user?._id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              {user?.bookInfo?.total} books
            </Link>
          </div>
        </div>
      </Card>
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(null)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(null)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
