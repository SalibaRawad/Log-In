import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login/Login";
import Register from "./pages/SignUp/Register";
import Main from "./pages/Main/Main";
import ForgotPassword from "./pages/Forgot/Forgot";
import Reset from "./pages/Reset/Reset";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<ProtectedRoutes />}>
            <Route path="/main" element={<Main />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<Reset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
