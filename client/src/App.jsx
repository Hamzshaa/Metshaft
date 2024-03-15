import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import ProgressPage from "./pages/ProgressPage";
import FinishedPage from "./pages/FinishedPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/finished" element={<FinishedPage />} />
          <Route
            path="/signin"
            element={currentUser ? <Navigate to="/" /> : <Signin />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <Signup />}
          />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
