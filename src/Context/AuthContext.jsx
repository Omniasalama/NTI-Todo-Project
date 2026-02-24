/** @format */
import React, { createContext, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("userToken");


    return savedToken || null;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userName");
  });

  return (
    <authContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
