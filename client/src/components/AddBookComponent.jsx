import {
  Button,
  Checkbox,
  Datepicker,
  FileInput,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  uploadImgStart,
  uploadImgFailure,
  uploadImgSuccess,
} from "../redux/book/bookSlice";
import { useDispatch } from "react-redux";

export default function AddBookComponent() {
  const dispatch = useDispatch();
  const [switch1, setSwitch1] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [inputs, setInputs] = useState({ date: new Date() });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleDatePickerChange = (date) => {
    console.log(typeof date);
    setSelectedDate(date);
    setInputs((prev) => {
      return { ...prev, date: date };
    });
  };

  //   const handleFileChange = (e) => {
  //     console.log(e.target.files[0]);
  //   };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImgDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  //   useEffect(() => {
  //     if (imageFile) {
  //       uploadImage();
  //     }
  //   }, [imageFile]);

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
          return { ...prev, img: data.secure_url };
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
        console.log("pis new");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
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
            required
            shadow
            onChange={handleChange}
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
          <Select id="genre" required onChange={handleChange}>
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
          />
        </div>
        <div className="w-[47%] ">
          <div className="mb-2 block">
            <Label htmlFor="date" value="Published date" />
          </div>
          <Datepicker
            id="date"
            selected={selectedDate}
            onSelectedDateChanged={handleDatePickerChange}
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
          />
        </div>
      </div>
      {!switch1 && (
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="language" value="Language" />
          </div>
          <TextInput
            id="language"
            type="text"
            placeholder="English"
            required
            shadow
            onChange={handleChange}
          />
        </div>
      )}
      {switch1 && (
        <div className="flex justify-between -mt-0 items-end">
          <div className="w-[40%]">
            <div className="mb-2 block">
              <Label htmlFor="original-language" value="Original language" />
            </div>
            <TextInput
              id="original-language"
              type="text"
              placeholder="English"
              required
              shadow
              onChange={handleChange}
            />
          </div>
          <div className="w-[28%]">
            <div className="mb-2 block">
              <Label htmlFor="translated_to" value="Translated to" />
            </div>
            <TextInput
              id="translated_to"
              type="text"
              placeholder="Amharic"
              required
              shadow
              onChange={handleChange}
            />
          </div>

          <div className="w-[28%]">
            <div className="mb-2 block">
              <Label htmlFor="translator" value="Translator" />
            </div>
            <TextInput
              id="translator"
              type="text"
              placeholder="አቤ ከቤ"
              required
              shadow
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      {!imageFile && (
        <div
          className="flex w-full items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImgDrop}
        >
          <Label
            htmlFor="dropzone-file"
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>
      )}
      {imageFile && (
        <div className="w-[576px] h-[256px] flex justify-center bg-[#374151] rounded-xl">
          <img
            src={URL.createObjectURL(imageFile)}
            alt=""
            className="h-[256px] w-fit self-center"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Checkbox id="addDirectly" />
        <Label htmlFor="addDirectly" className="flex">
          Add directly to the finished list
        </Label>
      </div>
      <Button type="submit">Add book</Button>
    </form>
  );
}
