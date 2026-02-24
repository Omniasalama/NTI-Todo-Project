/** @format */
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found 404</title>
      </Helmet>
      <section className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <h1 className="text-9xl font-black text-[#E5DDD4] animate-pulse">
            404
          </h1>

          <div className="mt-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1612] mb-4">
              Lost? Aren't we all?
            </h2>
            <p className="text-[#5C5047] max-w-md mx-auto leading-relaxed">
              You’re looking for a page that doesn't exist. But then again, does
              anything *really* exist? While you ponder the deep void of the
              internet, let's get you back to your ToDos.
            </p>
          </div>

          <div className="my-8 text-[#C8571A] text-6xl"></div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#C8571A] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#A64614] hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fa-solid fa-house"></i>
            Take Me Home (Country Roads)
          </Link>

          <p className="mt-12 text-xs text-[#9C8E82] italic">
            "Not all those who wander are lost... but you definitely are."
          </p>
        </div>
      </section>
    </>
  );
}
