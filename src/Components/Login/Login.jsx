/** @format */
import React, { useState, useContext } from "react"; // Added useContext
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet-async";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://todo-nti.vercel.app/user/login",
        {
          email: data.email,
          password: data.password,
        },
      );

      const result = response.data;

      if (result.token) {
        localStorage.setItem("userToken", result.token);
        localStorage.setItem("userName", result.user?.name || "User");

        setToken(result.token);

        setSuccess("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setApiError("Unexpected response from server.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Sign in To Your Account" />
      </Helmet>

      <section className="bg-[#F8F4EE] min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#F2E8E0] rounded-lg shadow-xl border border-[#E5DDD4]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl capitalize text-center font-bold text-[#1A1612] md:text-2xl">
              Login
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {apiError && (
                <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <i className="fas fa-circle-exclamation"></i>
                  <span>{apiError}</span>
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <i className="fas fa-circle-check"></i>
                  <span>{success}</span>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-[#1A1612]">
                  Email Address
                </label>
                <input
                  type="email"
                  className="bg-[#F8F4EE] border border-[#9C8E82] text-[#1A1612] text-sm rounded-lg focus:ring-2 focus:ring-[#C8571A] focus:border-[#C8571A] block w-full p-2.5 outline-none transition-all"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#1A1612]">
                  Password
                </label>
                <input
                  type="password"
                  className="bg-[#F8F4EE] border border-[#9C8E82] text-[#1A1612] text-sm rounded-lg focus:ring-2 focus:ring-[#C8571A] focus:border-[#C8571A] block w-full p-2.5 outline-none transition-all"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 text-white bg-[#C8571A] hover:bg-[#A64614] font-medium rounded-lg text-sm px-5 py-3 transition-all duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }`}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Wait, logging in...
                  </>
                ) : (
                  "Login to your account"
                )}
              </button>

              <p className="text-sm font-light text-[#5C5047] text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-[#C8571A] hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
