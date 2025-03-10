import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Check if user is logged in

  if (token) {
    return <Navigate to="/home" replace />; // Redirect to home if token exists
  }

  return children; // Otherwise, allow access to SignIn/SignUp
};

export default ProtectedAuthRoute;
