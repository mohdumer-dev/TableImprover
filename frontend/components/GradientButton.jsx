import React from "react";

export default function GradientButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        relative px-6 py-3 rounded-xl font-semibold text-white
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
        bg-[length:200%_200%] animate-gradient
        shadow-lg shadow-pink-500/40
        hover:shadow-pink-500/60 hover:scale-105
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
      "
    >
      {children}
    </button>
  );
}
