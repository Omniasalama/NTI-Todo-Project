/** @format */
import React, { useState, useContext } from "react";
// 1. Import NavLink instead of just Link
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(authContext);

  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!token;
  const userName = user || localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    setIsUserOpen(false);
    setIsMenuOpen(false);
    toast.success("Signed out successfully");
    localStorage.removeItem("userName");
    localStorage.removeItem("userToken");
    setUser("");
    setToken("");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded md:p-0 transition-all duration-300 ${
      isActive
        ? "text-[#C8571A] font-bold border-b-2 border-[#C8571A] md:border-b-0"
        : "text-[#1A1612] hover:text-[#C8571A]"
    }`;

  return (
    <nav className="bg-[#F2E8E0] fixed w-full z-20 top-0 start-0 border-b border-[#E5DDD4]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-[#1A1612]">
            ToDo <span className="text-[#C8571A]">App</span>
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 relative">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="flex text-sm rounded-full focus:ring-4 focus:ring-[#E5DDD4]"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#C8571A]">
                  <i className="fa-solid fa-user text-[#C8571A]"></i>
                </div>
              </button>

              {isUserOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-44 bg-[#F8F4EE] divide-y divide-[#E5DDD4] rounded-lg shadow-lg border border-[#E5DDD4]">
                  <div className="px-4 py-3 text-sm">
                    <span className="block text-[#1A1612] font-semibold capitalize">
                      {userName}
                    </span>
                    <span className="block text-xs text-[#5C5047]">Welcome back!</span>
                  </div>
                  <ul className="py-2 text-[#1A1612]">
                    <li>
                      <Link to="/Profile" onClick={() => setIsUserOpen(false)} className="block px-4 py-2 hover:bg-[#F2E8E0] hover:text-[#C8571A]">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/Login" className="text-sm font-medium text-[#1A1612] hover:text-[#C8571A]">
                Login
              </Link>
              <Link to="/Register" className="px-4 py-2 text-sm font-bold text-white bg-[#C8571A] rounded-lg hover:bg-[#A64614] transition-colors">
                Register
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-[#1A1612] rounded-lg md:hidden hover:bg-[#E5DDD4]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#E5DDD4] rounded-lg bg-[#F8F4EE] md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Profile" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="md:hidden">
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
                    Login
                  </NavLink>
                </li>
                <li className="md:hidden">
                  <NavLink to="/register" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}