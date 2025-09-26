import React from "react";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between 
                       px-6 py-4 bg-[#DAF1DE] dark:bg-[#051F20] shadow-md 
                       border-b border-[#051F20]/10 dark:border-[#DAF1DE]/10">
      {}
      <h1 className="text-2xl font-extrabold text-[#051F20] dark:text-[#DAF1DE] tracking-wide">
        Cybersecurity Learning Dashboard
      </h1>

      {/* Dark-Light Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-2 rounded-full bg-[#051F20] dark:bg-[#DAF1DE] 
                   text-[#DAF1DE] dark:text-[#051F20] font-bold shadow 
                   hover:scale-105 transition"
      >
        {darkMode ? "☀︎" : "🌙"}
      </button>
    </header>
  );
}
