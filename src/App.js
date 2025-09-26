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
      <div className="min-h-screen bg-[#DAF1DE] dark:bg-[#051F20] transition-colors duration-500">
        {}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {}
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6 text-[#051F20] dark:text-[#DAF1DE] tracking-wide">
              Resource Library
            </h2>

            {loading ? (
              <div className="flex justify-center items-center">
                <img
                  src={placeholderImage}
                  alt="Loading resources"
                  className="w-64 h-64 object-contain opacity-70"
                />
              </div>
            ) : filteredResources.length === 0 ? (
              <p className="text-[#051F20] dark:text-[#DAF1DE]">
                No resources found.
              </p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((res) => (
                  <li
                    key={res.id}
                    className="p-5 bg-white dark:bg-[#0A2E2F] rounded-2xl 
                               shadow-md hover:shadow-xl hover:scale-[1.03] 
                               transition-all duration-300 border border-[#051F20]/10 dark:border-[#DAF1DE]/10"
                  >
                    <h3 className="text-lg font-bold text-[#051F20] dark:text-[#DAF1DE]">
                      {res.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      {res.description}
                    </p>
                   <span
  className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full
    ${res.category === "Web Security" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : ""}
    ${res.category === "Networking" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
    ${res.category === "CTFs" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : ""}
    ${res.category === "Cryptography" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200" : ""}
    ${res.category === "General" ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" : ""}
    ${res.category === "Defensive Security" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : ""}
  `}
>
  {res.category}
</span>

                    <br />
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sm font-medium text-[#051F20] dark:text-[#DAF1DE] hover:underline"
                    >
                      Visit Resource →
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {}
          <div className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-[#0A2E2F] 
                          p-5 rounded-xl shadow-md border border-[#051F20]/10 dark:border-[#DAF1DE]/10">
            <h3 className="font-semibold mb-3 text-[#051F20] dark:text-[#DAF1DE]">
              Filter Resources
            </h3>

            {}
            <input
              type="text"
              placeholder="⌕ Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 mb-4 rounded-md border border-[#051F20]/20 
                         dark:border-[#DAF1DE]/20 bg-white dark:bg-[#0F3838] 
                         text-[#051F20] dark:text-[#DAF1DE] focus:ring-2 
                         focus:ring-[#051F20] dark:focus:ring-[#DAF1DE]"
            />

            {}
            <div className="flex flex-wrap gap-2">
              {[
                "Web Security",
                "Networking",
                "CTFs",
                "Cryptography",
                "General",
                "Defensive Security",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setFilterCategory(filterCategory === cat ? "" : cat)
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium border 
                    transition-colors duration-200
                    ${
                      filterCategory === cat
                        ? "bg-[#051F20] text-white dark:bg-[#DAF1DE] dark:text-[#051F20]"
                        : "bg-gray-100 text-gray-700 dark:bg-[#0F3838] dark:text-[#DAF1DE]/70"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Clear button*/}
            {filterCategory && (
              <button
                onClick={() => setFilterCategory("")}
                className="mt-4 text-xs text-red-500 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;