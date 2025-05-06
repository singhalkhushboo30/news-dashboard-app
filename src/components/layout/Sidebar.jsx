import { Link, useLocation } from "react-router-dom";
import React from "react";
const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "News", path: "/news" },
    { name: "Payouts", path: "/payouts" },
    { name: "Analytics", path: "/analytics" },
    { name: "Export", path: "/export" },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-md">
      <div className="p-6 text-2xl font-bold text-blue-600">
        Dashboard
      </div>
      <nav className="mt-10">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100
              ${location.pathname === item.path ? "bg-blue-100 text-blue-700" : "text-gray-700"}
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
