import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
    >
      <Router>
        <div className="flex justify-end items-center p-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-3 py-4 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? "Chế độ sáng" : "Chế độ tối"}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<MovieList darkMode={darkMode} />} />
          <Route
            path="/movie/:id"
            element={<MovieDetail darkMode={darkMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
