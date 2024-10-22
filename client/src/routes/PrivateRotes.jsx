/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../utils/getUserInfo";

const PrivateRotes = ({ children }) => {
  const userInfo = getUserInfo();

  if (
    (userInfo && userInfo?.role === "admin") ||
    userInfo?.role === "finance"
  ) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRotes;
