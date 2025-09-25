import React, { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [resources, setResources] = useState([]); // All data from API
  const [filteredResources, setFilteredResources] = useState([]); // After search/filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Fetch resources from your MockAPI
  useEffect(() => {
    fetch("https://68d4302e214be68f8c68a9b2.mockapi.io/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setFilteredResources(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Filter + search logic
  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter((res) =>
        res.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(
        (res) => res.category === filterCategory
      );
    }

    setFilteredResources(filtered);
  }, [searchTerm, filterCategory, resources]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-800 transition">
        {/* Header with search + filter */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSearch={setSearchTerm}
          onFilter={setFilterCategory}
        />

        {/* Content */}
        <main className="p-6 text-gray-800 dark:text-gray-200">
          <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>

          {filteredResources.length === 0 ? (
            <p>No resources found.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((res) => (
                <li
                  key={res.id}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
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
        </main>
      </div>
    </div>
  );
}

export default App;


/*App.js edhe Header.js i kom ndreqqqq*/
