"use client";

export default function GlobalAlert({ message, type }) {
  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm ${
          colors[type] || colors.info
        }`}
      >
        {message}
      </div>
    </div>
  );
}
