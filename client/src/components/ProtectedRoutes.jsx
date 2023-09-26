/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest
export default function ProtectedRoutes() {
  const token = cookies.get("TOKEN");
  return token ? <Outlet /> : <Navigate to="/" />;
}
