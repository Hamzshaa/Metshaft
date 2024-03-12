import { Button, Card, Label, TextInput } from "flowbite-react";
import book from "../assets/book1.png";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="flex max-w-fit sm:max-w-6xl mx-auto sm:space-x-10 sm:justify-center   items-center h-[var(--body-height)]  overflow-y-scroll">
      <div className="flex flex-col justify-center hidden sm:block">
        <img src={book} alt="book" className="w-[300px] h-fit" />
      </div>
      <Card className=" bg-transparent dark:bg-transparent shadow-none border-0 sm:border-l-2 sm:border-l-slate-700 rounded-none sm:pl-16">
        <form className="flex flex-col gap-4 sm:w-80">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="johndoe@gmail.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>

          <Button type="submit">Submit</Button>
          <div className="flex gap-1 mt-4">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-600 dark:text-blue-400">
              Sign Up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
