import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// Import all pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Payouts from "./pages/Payouts";
import Analytics from "./components/layout/Analytics";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem("darkMode", newDarkModeState);
    if (newDarkModeState) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/news" element={isLoggedIn ? <News /> : <Navigate to="/login" />} />
        <Route path="/payouts" element={isLoggedIn ? <Payouts /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/login" />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
      >
        {isDarkMode ? "🌙" : "🌞"}
      </button>
    </div>
  );
}

export default App;
