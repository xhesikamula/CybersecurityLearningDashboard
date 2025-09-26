import React from "react";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Cybersecurity Learning Dashboard
      </h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-2 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
