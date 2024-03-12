import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import ProgressPage from "./pages/ProgressPage";
import FinishedPage from "./pages/FinishedPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/finished" element={<FinishedPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
