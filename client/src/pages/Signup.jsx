import { Button, Card, Label, TextInput } from "flowbite-react";
import book from "../assets/book2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [inputs, setinputs] = useState({});

  const handleChange = (e) => {
    setinputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
  };

  return (
    <div className="flex max-w-fit sm:max-w-6xl mx-auto sm:space-x-10 sm:justify-center items-center h-[var(--body-height)] overflow-y-scroll ">
      <Card className=" bg-transparent dark:bg-transparent shadow-none border-0 sm:border-r-2 sm:border-r-slate-700 rounded-none sm:pr-16">
        <form className="flex flex-col gap-4 sm:w-80" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Full name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>
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
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Confirm password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              required
              onChange={handleChange}
            />
          </div>

          <Button type="submit">Submit</Button>
          <OAuth />
          <div className="flex gap-1 mt-4">
            Already have an account?
            <Link to="/signin" className="text-blue-600 dark:text-blue-400">
              Sign In
            </Link>
          </div>
        </form>
      </Card>
      <div className="flex flex-col justify-center hidden sm:block">
        <img src={book} alt="book" className="w-[300px] h-fit" />
      </div>
    </div>
  );
}
