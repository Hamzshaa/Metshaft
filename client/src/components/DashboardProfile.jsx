import {
  Alert,
  Avatar,
  Button,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  uploadImgFailure,
  uploadImgStart,
  uploadImgSuccess,
  deleteAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashboardProfile() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  console.log(inputs);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    dispatch(uploadImgStart());
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const cloudPreset = import.meta.env.VITE_CLOUD_PRESET;
      formData.append("upload_preset", cloudPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(uploadImgSuccess());
        setInputs((prev) => {
          return { ...prev, profilePicture: data.secure_url };
        });
      } else {
        dispatch(uploadImgFailure(data.message));
        console.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      dispatch(uploadImgFailure(error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
      } else {
        dispatch(updateFailure(data.message));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDelete = async () => {
    dispatch(deleteAccountStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = res.json();
      if (res.ok) {
        dispatch(deleteAccountSuccess());
        navigate("/signin");
      } else {
        dispatch(deleteAccountFailure(data.message));
      }
    } catch (error) {
      dispatch(deleteAccountFailure(error.message));
      console.log(error.message);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center mt-12">
      <form
        className="flex max-w-md w-full px-5 sm:px-0 flex-col gap-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <Avatar
          size="xl"
          img={inputs.profilePicture || currentUser.profilePicture}
          rounded
          bordered
          color="gray"
          onClick={() => {
            if (!loading) fileRef.current.click();
          }}
          className="mb-10 w-fit mx-auto"
        />
        <FileInput
          ref={fileRef}
          id="file-upload"
          className="hidden"
          onChange={handleImageChange}
          disabled={loading}
        />

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="name"
            placeholder="John Doe"
            shadow
            onChange={handleChange}
            value={inputs.name}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="trident32000@gmail.com"
            required
            shadow
            onChange={handleChange}
            value={inputs.email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            shadow
            onChange={handleChange}
            value={inputs.password}
          />
        </div>
        <Button type="submit" gradientDuoTone="tealToLime" className="mt-5">
          Update
        </Button>
        <div className="mt-5 ">
          <span
            className="text-red-600 dark:text-red-500 cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            Delete Account
          </span>
        </div>
        {error && (
          <Alert color="failure" className="mt-5 ">
            {error}
          </Alert>
        )}
        <div className="mb-12 md:mb-0"></div>
      </form>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
