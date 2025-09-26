import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import placeholderImage from "./assets/placeholder.png"; 

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://68d4302e214be68f8c68a9b2.mockapi.io/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setFilteredResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter((res) =>
        res.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((res) => res.category === filterCategory);
    }

    setFilteredResources(filtered);
  }, [searchTerm, filterCategory, resources]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-800 transition">
        {/* Header only for title + dark mode */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main layout: content left, sidebar right */}
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Left: Learning Resources */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>

            {loading ? (
              <div className="flex justify-center items-center">
                <img
                  src={placeholderImage}
                  alt="Loading resources"
                  className="w-64 h-64 object-contain"
                />
              </div>
            ) : filteredResources.length === 0 ? (
              <p>No resources found.</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((res) => (
                  <li
                    key={res.id}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow transform hover:scale-105 transition duration-300"
                  >
                    <h3 className="text-lg font-bold">{res.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {res.description}
                    </p>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {res.category}
                    </span>
                    <br />
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Visit Resource
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Search + Filter Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Filter Resources
            </h3>

            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 mb-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">All Categories</option>
              <option value="Web Security">Web Security</option>
              <option value="Networking">Networking</option>
              <option value="CTFs">CTFs</option>
              <option value="Cryptography">Cryptography</option>
              <option value="General">General</option>
              <option value="Defensive Security">Defensive Security</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


/*App.js edhe Header.js i kom ndreqqqq*/
