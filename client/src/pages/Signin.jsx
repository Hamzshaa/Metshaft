import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import book from "../assets/book1.png";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useState } from "react";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex max-w-fit sm:max-w-6xl mx-auto sm:space-x-10 sm:justify-center   items-center h-[var(--body-height)]  overflow-y-scroll">
      <div className="flex flex-col justify-center hidden sm:block">
        <img src={book} alt="book" className="w-[300px] h-fit" />
      </div>
      <Card className=" bg-transparent dark:bg-transparent shadow-none border-0 sm:border-l-2 sm:border-l-slate-700 rounded-none sm:pl-16">
        <form className="flex flex-col gap-4 sm:w-80" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              required
              onChange={handleChange}
              value={inputs.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              onChange={handleChange}
              value={inputs.password}
            />
          </div>

          <Button type="submit" disabled={loading} isProcessing={loading}>
            Submit
          </Button>
          <OAuth />
          <div className="flex gap-1 mt-4">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-600 dark:text-blue-400">
              Sign Up
            </Link>
          </div>
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        </form>
      </Card>
    </div>
  );
}
