import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const { data } = await api.get("/activities/getMyActivities");
      setActivities(data.activities);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    try {
      await api.delete(`/activities/deleteActivity/${id}`);
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Activities</h2>
        <Link
          to="/activities/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Activity
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {activities.map((act) => (
          <div
            key={act._id}
            className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{act.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {act.type.charAt(0).toUpperCase() + act.type.slice(1)} •{" "}
              {new Date(act.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 flex-1">{act.description}</p>

            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    act.status === "approved"
                      ? "text-green-600"
                      : act.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {act.status.charAt(0).toUpperCase() + act.status.slice(1)}
                </span>
              </p>
              <p>
                <span className="font-medium">Points:</span> {act.points}
              </p>
              {act.fileUrl && (
                <p>
                  <span className="font-medium">File:</span>{" "}
                  <a
                    href={act.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </p>
              )}
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(act.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Updated:</span>{" "}
                {new Date(act.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className="mt-auto flex space-x-2">
              <button
                onClick={() => navigate(`/dashboard/activity/${act._id}/edit`)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(act._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
