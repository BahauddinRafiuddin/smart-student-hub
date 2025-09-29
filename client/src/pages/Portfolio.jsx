import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import jsPDF from "jspdf";
import api from "../api/axiosConfig.js";

const Portfolio = () => {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data } = await api.get("/activities/getMyActivities");
      setActivities(data.activities);

      // Calculate stats
      const total = data.activities.length;
      const approved = data.activities.filter(
        (a) => a.status === "approved"
      ).length;
      const pending = data.activities.filter(
        (a) => a.status === "pending"
      ).length;
      const rejected = data.activities.filter(
        (a) => a.status === "rejected"
      ).length;

      setStats({ total, approved, pending, rejected });
    } catch (error) {
      console.error("Failed to fetch activities");
    }
  };

  const downloadPortfolio = async () => {
    setDownloading(true);
    try {
      // Create PDF content
      const pdf = new jsPDF();

      // Header
      pdf.setFontSize(20);
      pdf.text("Student Portfolio", 20, 20);

      // Date
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

      // User Info
      pdf.setFontSize(16);
      pdf.text("Personal Information", 20, 50);
      pdf.setFontSize(12);
      pdf.text(`Name: ${user?.name}`, 20, 65);
      pdf.text(`Email: ${user?.email}`, 20, 75);
      pdf.text(`Student ID: ${user?.rollNo || "N/A"}`, 20, 85);
      pdf.text(`Course: ${user?.course || "N/A"}`, 20, 95);

      // Statistics
      pdf.setFontSize(16);
      pdf.text("Activity Statistics", 20, 115);
      pdf.setFontSize(12);
      pdf.text(`Total Activities: ${stats.total}`, 20, 130);
      pdf.text(`Approved: ${stats.approved}`, 20, 140);
      pdf.text(`Pending: ${stats.pending}`, 20, 150);
      pdf.text(`Rejected: ${stats.rejected}`, 20, 160);

      // Activities
      pdf.setFontSize(16);
      pdf.text("Activities", 20, 180);

      let yPos = 195;
      activities.forEach((activity, index) => {
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(12);
        pdf.text(`${index + 1}. ${activity.title}`, 20, yPos);
        pdf.setFontSize(10);
        pdf.text(
          `Type: ${activity.type} | Status: ${activity.status}`,
          25,
          yPos + 10
        );
        pdf.text(
          `Date: ${new Date(activity.date).toLocaleDateString()}`,
          25,
          yPos + 20
        );

        const description = activity.description || "";
        const shortDesc =
          description.length > 80
            ? description.substring(0, 80) + "..."
            : description;
        pdf.text(`Description: ${shortDesc}`, 25, yPos + 30);

        yPos += 45;
      });

      // Download
      pdf.save(
        `${user?.name}_Portfolio_${new Date().toISOString().split("T")[0]}.pdf`
      );
    } catch (error) {
      alert("Failed to generate portfolio: " + error.message);
    }
    setDownloading(false);
  };

  const getStatColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
        <p className="text-gray-600">
          Download and manage your academic portfolio
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Activities
          </h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Download Portfolio
        </h2>
        <p className="text-gray-600 mb-6">
          Generate a comprehensive PDF portfolio containing your personal
          information, activity statistics, and detailed list of all your
          activities.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={downloadPortfolio}
            disabled={downloading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {downloading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>📄 Download Portfolio PDF</>
            )}
          </button>

          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Activities Preview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activities
        </h2>

        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No activities found. Add your first activity to get started!
          </p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity._id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="font-semibold text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 capitalize">
                  {activity.type}
                </p>
                <p
                  className={`text-sm font-medium ${getStatColor(
                    activity.status
                  )}`}
                >
                  {activity.status.charAt(0).toUpperCase() +
                    activity.status.slice(1)}
                </p>
              </div>
            ))}
            {activities.length > 5 && (
              <p className="text-sm text-gray-500 text-center pt-2">
                And {activities.length - 5} more activities...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
