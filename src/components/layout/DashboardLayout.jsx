import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import OfflineBanner from "../OfflineBanner";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <OfflineBanner/>
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
