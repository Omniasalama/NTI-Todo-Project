import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";


export default function GuestRoutes({children}) {
 const { token } = useContext(authContext);

  if (token || localStorage.getItem("userToken")) {
    return <Navigate to="/" replace />;
  }

  return children;
}
