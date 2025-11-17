// src/components/Topbar.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,   // ✅ Import an icon for Grades
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle navigation
  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close dropdown after click
  };

  return (
    <div className="topbar-container">
      <div className="topbar">
        <div className="logo-text">
          <img src="/kalinga-logo.svg" alt="Logo" className="logo-image" />
          <span className="highlight">KALINGA</span>
        </div>

        <div className="topbar-right">
          {/* Search Box */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>

          {/* Notifications */}
          <button className="icon-button">
            <FaBell />
          </button>

          {/* User Dropdown */}
          <div className="user-menu" ref={menuRef}>
            <button
              className="icon-button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <FaUserCircle />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul>
                    <li onClick={() => handleNavigate("/profile")}>
                      <FaUser className="menu-icon" /> Profile
                    </li>
                    <li onClick={() => handleNavigate("/settings")}>
                      <FaCog className="menu-icon" /> Settings
                    </li>
                    {/* ✅ NEW: Grades Tab */}
                    <li onClick={() => handleNavigate("/grades")}>
  <FaUser className="menu-icon" /> Grades
</li>

                    <li
                      className="logout"
                      onClick={() => alert("Logging out...")}
                    >
                      <FaSignOutAlt className="menu-icon" /> Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;