/** @format */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import z from "zod";
import { Helmet } from "react-helmet-async";

const schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password required"),
    terms: z
      .boolean()
      .refine((val) => val, { message: "You must accept terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
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
      const res = await axios.post("https://todo-nti.vercel.app/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (
        res.data.message === "success" ||
        res.data.message === "user created"
      ) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setApiError(res.data.message || "An error occurred");
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      setApiError(serverMessage || "Network error. The server might be down.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Create a new account" />
      </Helmet>
      <section className="bg-[#F8F4EE] min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-md bg-[#F2E8E0] rounded-lg shadow-xl border border-[#E5DDD4]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold text-center text-[#1A1612]">
                Create an account
              </h1>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {apiError && (
                  <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <span className="font-bold">✕</span>
                    <span>{apiError}</span>
                  </div>
                )}

                {success && (
                  <div className="p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <span className="font-bold">✓</span>
                    <span>{success}</span>
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-sm font-medium text-[#1A1612]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#F8F4EE] border border-[#9C8E82] text-[#1A1612] text-sm rounded-lg focus:ring-2 focus:ring-[#C8571A] focus:border-[#C8571A] block w-full p-2.5 outline-none transition-all"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[#1A1612]">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
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
                    placeholder="••••••••"
                    className="bg-[#F8F4EE] border border-[#9C8E82] text-[#1A1612] text-sm rounded-lg focus:ring-2 focus:ring-[#C8571A] focus:border-[#C8571A] block w-full p-2.5 outline-none transition-all"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[#1A1612]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#F8F4EE] border border-[#9C8E82] text-[#1A1612] text-sm rounded-lg focus:ring-2 focus:ring-[#C8571A] focus:border-[#C8571A] block w-full p-2.5 outline-none transition-all"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-0.5 rounded border-[#9C8E82] text-[#C8571A] focus:ring-[#C8571A] accent-[#C8571A]"
                      {...register("terms")}
                    />
                    <label className="text-sm text-[#5C5047]">
                      I accept the{" "}
                      <span className="text-[#C8571A] underline cursor-pointer">
                        Terms and Conditions
                      </span>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-600 text-xs">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 text-white bg-[#C8571A] hover:bg-[#A64614] font-bold rounded-lg text-sm px-5 py-3 transition-all duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Wait, data is sending...
                    </>
                  ) : (
                    "Create an account"
                  )}
                </button>

                <p className="text-sm font-light text-[#5C5047] text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#C8571A] hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
