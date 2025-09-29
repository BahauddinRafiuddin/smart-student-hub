import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">Glad to see you back.</p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Info
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="text-gray-900">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Student ID:</span>
            <span className="text-gray-900">{user?.rollNo || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard/my-activities"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center"
          >
            View Activities
          </Link>
          <Link
            to="/dashboard/add-activity"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-center"
          >
            Add New Activity
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
