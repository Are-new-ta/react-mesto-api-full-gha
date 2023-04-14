import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  // console.log("!! props",props)
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
