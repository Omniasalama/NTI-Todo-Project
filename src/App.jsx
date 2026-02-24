/** @format */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AuthContextProvider from "./Context/AuthContext";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import UserRoutes from "./Components/UserRoutes/UserRoutes"; // Verify this folder name is capitalized on GitHub!
import GuestRoutes from "./Components/GuestRoutes/GuestRoutes";
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from "react-helmet-async"; // Fixed empty import

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <UserRoutes><Home /></UserRoutes> },
      { path: "Profile", element: <UserRoutes><Profile/></UserRoutes> },
      { path: "Register", element:<GuestRoutes> <Register /></GuestRoutes> },
      { path: "Login", element: <GuestRoutes><Login /></GuestRoutes> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <AuthContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </HelmetProvider>
  );
}

export default App;