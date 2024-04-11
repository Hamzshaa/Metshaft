import {
  Alert,
  Button,
  Label,
  Radio,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { incrementUnseenNotifications } from "../../redux/notification/notificationSlice";

export default function NotifyUsersPage() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("all");
  const [inputs, setInputs] = useState({ target: selectedOption });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setInputs((prev) => ({ ...prev, target: selectedOption }));
  }, [selectedOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch("/api/user/notification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setSuccessMessage(data.message);
        dispatch(incrementUnseenNotifications());
      } else {
        console.log("error: ", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="px-2 mb-20 min-h-[var(--body-height)] sm:mx-auto">
      <div className="text-2xl font-semibold text-center my-16">
        Notify Users
      </div>

      <div className="sm:w-[500px] md:w-[550px] md:px-5 lg:w-[700px]">
        <form onSubmit={handleSubmit}>
          <fieldset className=" mb-6">
            <legend className="font-medium mb-2">Choose target</legend>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="all"
                    name="target"
                    value="all"
                    checked={selectedOption === "all"}
                    onChange={handleOptionChange}
                  />
                  <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="except-admins"
                    name="target"
                    value="except-admins"
                    checked={selectedOption === "except-admins"}
                    onChange={handleOptionChange}
                  />
                  <Label htmlFor="except-admins">Except Admins</Label>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="only-admins"
                    name="target"
                    value="only-admins"
                    checked={selectedOption === "only-admins"}
                    onChange={handleOptionChange}
                  />
                  <Label htmlFor="only-admins">Only Admins</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="single-user"
                    name="target"
                    value="single-user"
                    checked={selectedOption === "single-user"}
                    onChange={handleOptionChange}
                  />
                  <Label htmlFor="single-user">Single User</Label>
                </div>
              </div>
            </div>
          </fieldset>

          {selectedOption == "single-user" && (
            <div className="mb-4">
              <div className="mb-2 block">
                <Label htmlFor="email" color="gray" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="trident32000@gmail.com"
                required
                color="gray"
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="title" color="gray" value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Title"
              color="gray"
              onChange={handleInputChange}
            />
          </div>

          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="message" value="Message" />
            </div>
            <Textarea
              id="message"
              placeholder="Leave a comment..."
              required
              rows={4}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-10">
            <Button type="submit" color="teal" outline>
              Push Notification
            </Button>
          </div>
          {successMessage && (
            <Alert className="mt-5 items-center" color="info">
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert className="mt-5 items-center" color="failure">
              {error}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
