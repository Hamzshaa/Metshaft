import {
  Alert,
  Button,
  Checkbox,
  Datepicker,
  FileInput,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { useRef, useState } from "react";
import {
  processStart,
  processFailure,
  processSuccess,
} from "../redux/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddBookComponent() {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.book);
  const [switch1, setSwitch1] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const [inputs, setInputs] = useState({
    date: new Date(),
    user_id: currentUser._id,
    published_date: null,
    state: "onProgress",
  });

  // console.log(inputs);

  const handleChange = (e) => {
    if (e.target.id === "addDirectly") {
      setInputs((prev) => {
        if (e.target.checked) {
          return { ...prev, ["state"]: "finished" };
        } else {
          return { ...prev, ["state"]: "onProgress" };
        }
      });
    } else {
      setInputs((prev) => {
        return { ...prev, [e.target.id]: e.target.value };
      });
    }
  };

  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
    setInputs((prev) => {
      return { ...prev, published_date: date };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target?.files[0];
      if (file) {
        console.log(file);
        setImageFile(file);
        if (inputs.img) {
          deleteImgFromCloudinary(inputs.img);
        }
        uploadImage(file);
      }
    }
  };

  const handleImgDrop = (e) => {
    e?.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log(file);
      setImageFile(file);
      if (inputs.img) {
        deleteImgFromCloudinary(inputs.img);
      }
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    dispatch(processStart());
    try {
      const formData = new FormData();
      formData.append("file", file || imageFile);
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
        dispatch(processSuccess());
        setInputs((prev) => {
          return { ...prev, img: data.secure_url };
        });
      } else {
        dispatch(processFailure(data.message));
        console.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      dispatch(processFailure(error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(processStart());
    try {
      if (imageFile) {
        uploadImage();
      }
      const res = await fetch("/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(processSuccess());
        setInputs({
          date: new Date(),
          user_id: currentUser._id,
          published_date: null,
          state: "onProgress",
        });
        setSwitch1(false);
        setImageFile(null);
      } else {
        dispatch(processFailure(data.message));
      }
    } catch (error) {
      dispatch(processFailure(error.message));
    }
  };

  const deleteImgFromCloudinary = async (img) => {
    if (!img) {
      return;
    }
    dispatch(processStart());
    let fileName = img.split("/").pop().split(".")[0];
    console.log("FILENAME: ", fileName);
    try {
      const res = await fetch(`/api/books/delete/img/${fileName}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(processSuccess());
        console.log(data);
      } else {
        dispatch(processFailure(data.message));
      }
    } catch (error) {
      dispatch(processFailure(error.message));
    }
  };

  return (
    <form
      className="flex max-w-xl flex-col gap-4 w-full my-10"
      onSubmit={handleSubmit}
    >
      <div className="text-3xl text-center my-10 font-semibold">Add Book</div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Book title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Atomic Habits"
          required
          shadow
          onChange={handleChange}
          value={inputs?.title || ""}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="author" value="Author" />
        </div>
        <TextInput
          id="author"
          type="text"
          placeholder="James Clear"
          required
          shadow
          onChange={handleChange}
          value={inputs?.author || ""}
        />
      </div>
      <div className="flex justify-between ">
        <div className="w-[47%]">
          <div className="mb-2 block">
            <Label htmlFor="page" value="Number of pages" />
          </div>
          <TextInput
            id="page"
            type="text"
            placeholder="320"
            shadow
            onChange={handleChange}
            value={inputs?.page || ""}
          />
        </div>

        <div className="w-[47%]">
          <div className="mb-2 block">
            <Label
              htmlFor="genre"
              value="Book's genre"
              onChange={handleChange}
            />
          </div>
          <Select
            id="genre"
            required
            onChange={handleChange}
            value={inputs?.genre || "Other"}
          >
            <option>Academic</option>
            <option>Action and adventure</option>
            <option>Biography</option>
            <option>Comedy</option>
            <option>Creative nonfiction</option>
            <option>Crime and mystery</option>
            <option>Fantasy</option>
            <option>Fiction</option>
            <option>Horror</option>
            <option>Science fiction</option>
            <option>Self help</option>
            <option>Spiritual</option>
            <option defaultValue>Other</option>
          </Select>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="w-[47%]">
          <div className="mb-2 block">
            <Label htmlFor="publisher" value="Publisher" />
          </div>
          <TextInput
            id="publisher"
            type="text"
            placeholder="Penguin Random House"
            shadow
            onChange={handleChange}
            value={inputs?.publisher || ""}
          />
        </div>
        <div className="w-[47%] ">
          <div className="mb-2 block">
            <Label htmlFor="published_date" value="Published date" />
          </div>
          <Datepicker
            id="published_date"
            selected={selectedDate}
            onSelectedDateChanged={handleDatePickerChange}
            value={
              inputs?.published_date ||
              new Date().toLocaleDateString("en-US", options)
            }
          />
        </div>
      </div>
      <div className="flex justify-between -mt-0 items-end">
        <ToggleSwitch
          checked={switch1}
          label="Translated"
          onChange={setSwitch1}
        />

        <div className="w-[47%]">
          <div className="mb-2 block">
            <Label htmlFor="nationality" value="Author's nationality" />
          </div>
          <TextInput
            id="nationality"
            type="text"
            placeholder="American"
            shadow
            onChange={handleChange}
            value={inputs?.nationality || ""}
          />
        </div>
      </div>

      <div className="flex justify-between -mt-0 items-end">
        <div className={switch1 ? "w-[40%]" : "w-full"}>
          <div className="mb-2 block">
            <Label
              htmlFor="language"
              value={switch1 ? "Original language" : "Language"}
            />
          </div>
          <TextInput
            id="language"
            type="text"
            placeholder="English"
            required
            shadow
            onChange={handleChange}
            value={inputs?.language || ""}
          />
        </div>
        {switch1 && (
          <div className="w-[28%]">
            <div className="mb-2 block">
              <Label htmlFor="translated_to" value="Translated to" />
            </div>
            <TextInput
              id="translated_to"
              type="text"
              placeholder="Amharic"
              shadow
              onChange={handleChange}
              value={inputs?.translated_to || ""}
            />
          </div>
        )}
        {switch1 && (
          <div className="w-[28%]">
            <div className="mb-2 block">
              <Label htmlFor="translator" value="Translator" />
            </div>
            <TextInput
              id="translator"
              type="text"
              placeholder="አቤ ከቤ"
              shadow
              onChange={handleChange}
              value={inputs?.translator || ""}
            />
          </div>
        )}
      </div>
      <div
        className={`flex w-full items-center justify-center ${
          (imageFile || inputs.img) && "hidden"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImgDrop}
        onClick={(e) => handleFileChange(e)}
      >
        <Label
          htmlFor="img"
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            id="img"
            className="hidden"
            onChange={handleFileChange}
            ref={imgRef}
          />
        </Label>
      </div>
      {(imageFile || inputs.img) && (
        <div
          className="w-[576px] h-[256px] flex justify-center bg-[#374151] rounded-xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImgDrop}
          onClick={() => imgRef.current.click()}
        >
          <img
            src={(imageFile && URL.createObjectURL(imageFile)) || inputs.img}
            alt=""
            className="h-[256px] w-fit self-center"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Checkbox
          id="addDirectly"
          onChange={handleChange}
          checked={inputs.state == "finished"}
        />
        <Label htmlFor="addDirectly" className="flex">
          Add directly to the finished list
        </Label>
      </div>
      <Button type="submit" disabled={loading} isProcessing={loading}>
        Add book
      </Button>
      {error && (
        <Alert color="failure" className="mt-5 ">
          {error}
        </Alert>
      )}
    </form>
  );
}
