import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const adminMenuItems = [
    { path: "/dashboard", icon: "🏠", label: "Overview" },
    { path: "/dashboard/activities", icon: "📋", label: "Activities" },
    { path: "/dashboard/reports", icon: "📊", label: "Reports" },
    { path: "/dashboard/users", icon: "👥", label: "Manage Users" },
    { path: "/dashboard/settings", icon: "⚙️", label: "Settings" },
  ];

  const studentMenuItems = [
    { path: "/dashboard", icon: "👤", label: "Profile" },
    { path: "/dashboard/my-activities", icon: "📝", label: "My Activities" },
    { path: "/dashboard/add-activity", icon: "➕", label: "Add Activity" },
    { path: "/dashboard/portfolio", icon: "📄", label: "Portfolio" },
  ];

  const facultyMenuItems = [
    { path: "/dashboard", icon: "🏠", label: "Overview" },
    {
      path: "/dashboard/student-activities",
      icon: "📋",
      label: "Student Activities",
    },
    { path: "/dashboard/reports", icon: "📊", label: "Reports" },
    { path: "/dashboard/profile", icon: "👤", label: "Profile" },
  ];

  const getMenuItems = () => {
    if (user?.role === "admin") return adminMenuItems;
    if (user?.role === "faculty") return facultyMenuItems;
    return studentMenuItems;
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-gray-900 text-white h-screen relative transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b border-gray-700 flex items-center justify-between ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        {!isCollapsed && (
          <h2 className="text-xl font-bold">
            {user?.role === "admin"
              ? "Admin Panel"
              : user?.role === "faculty"
              ? "Faculty Panel"
              : "Student Panel"}
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white ml-2"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav
        className={`flex-1 p-2 flex flex-col items-center ${
          isCollapsed ? "" : "items-start"
        }`}
      >
        {getMenuItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center ${
              isCollapsed ? "justify-center" : ""
            } w-full p-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 w-full px-4">
        <button
          onClick={logout}
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center" : ""
          } p-3 text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer`}
        >
          <span className="text-xl">🚪</span>
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
