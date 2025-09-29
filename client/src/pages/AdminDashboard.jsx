import { toast } from "react-toastify";
import api from "../api/axiosConfig.js";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/all")
      .then(({ data }) => {
        setActivities(data.activities);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to load activities");
      });
  }, []);

  const approve = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      setActivities((acts) =>
        acts.map((a) => (a._id === id ? { ...a, status: "approved" } : a))
      );
      toast.success("Activity approved successfully!");
    } catch (error) {
      toast.error("Failed to approve activity");
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/admin/reject/${id}`);
      setActivities((acts) =>
        acts.map((a) => (a._id === id ? { ...a, status: "rejected" } : a))
      );
      toast.info("Activity rejected");
    } catch (error) {
      toast.error("Failed to reject activity");
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true;
    return activity.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return `px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`;
  };

  const getTypeIcon = (type) => {
    const icons = {
      conference: "🎤",
      workshop: "🛠️",
      certification: "📜",
      competition: "🏆",
      internship: "💼",
      volunteering: "🤝",
      club: "👥",
      sports: "⚽",
    };
    return icons[type] || "📋";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Activities Management
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Review and manage student activity submissions
              </p>
            </div>
            <div className="flex flex-col sm:items-end space-y-2">
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-yellow-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Pending:{" "}
                  {activities.filter((a) => a.status === "pending").length}
                </span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Approved:{" "}
                  {activities.filter((a) => a.status === "approved").length}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Total: {activities.length} activities
              </span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "all"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Activities
              <span className="ml-1 text-xs opacity-75">
                ({activities.length})
              </span>
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "pending"
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
              <span className="ml-1 text-xs opacity-75">
                ({activities.filter((a) => a.status === "pending").length})
              </span>
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "approved"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Approved
              <span className="ml-1 text-xs opacity-75">
                ({activities.filter((a) => a.status === "approved").length})
              </span>
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "rejected"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Rejected
              <span className="ml-1 text-xs opacity-75">
                ({activities.filter((a) => a.status === "rejected").length})
              </span>
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No activities found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {filter === "all"
                  ? "No activities have been submitted yet."
                  : `No activities with status "${filter}" found.`}
              </p>
            </div>
          ) : (
            /* Increased max-height from max-h-96 to max-h-[70vh] for better mobile experience */
            <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="divide-y divide-gray-200">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity._id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    {/* Mobile-first layout */}
                    <div className="space-y-4">
                      {/* Header with title and status */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="text-2xl flex-shrink-0 mt-1">
                            {getTypeIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-gray-600 capitalize mt-1">
                              {activity.type} Activity
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={getStatusBadge(activity.status)}>
                            {activity.status.charAt(0).toUpperCase() +
                              activity.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Info grid - responsive */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50 rounded-lg p-3">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Date
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {new Date(activity.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Student
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1 truncate">
                            {activity.studentId?.name || "Unknown Student"}
                          </p>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Submitted
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {new Date(
                              activity.createdAt || activity.date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Description
                        </span>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>

                      {/* Attachment link */}
                      {activity.fileUrl && (
                        <div>
                          <a
                            href={activity.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              />
                            </svg>
                            View Certificate/Document
                            <svg
                              className="w-3 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      )}

                      {/* Action buttons - responsive */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <button
                          disabled={activity.status === "approved"}
                          onClick={() => approve(activity._id)}
                          className="flex-1 sm:flex-initial px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {activity.status === "approved"
                            ? "Approved"
                            : "Approve"}
                        </button>
                        <button
                          disabled={activity.status === "rejected"}
                          onClick={() => reject(activity._id)}
                          className="flex-1 sm:flex-initial px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          {activity.status === "rejected"
                            ? "Rejected"
                            : "Reject"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
