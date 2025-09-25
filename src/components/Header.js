import React, { useState } from "react";

export default function Header({ darkMode, setDarkMode, onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value);
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow-md gap-4">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Cybersecurity Learning Dashboard
      </h1>

      {/* Search + Filter + Dark Mode Toggle */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />

        {/* Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          <option value="">All Categories</option>
          <option value="Web Security">Web Security</option>
          <option value="Networking">Networking</option>
          <option value="CTFs">CTFs</option>
          <option value="Cryptography">Cryptography</option>
          <option value="General">General</option>
        </select>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
