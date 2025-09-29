import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig.js";
import { useEffect, useState } from "react";

const EditActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    date: "",
    fileUrl: "",
  });

  const types = [
    "conference",
    "workshop",
    "certification",
    "competition",
    "internship",
    "volunteering",
    "club",
    "sports",
  ];

  useEffect(() => {
    // Fetch existing activity details by id to prefill the form
    const fetchActivity = async () => {
      try {
        const { data } = await api.get(`/activities/getActivityById/${id}`);
        const activity = data.activity;
        setForm({
          title: activity.title || "",
          type: activity.type || "",
          description: activity.description || "",
          date: activity.date ? activity.date.slice(0, 10) : "",
          fileUrl: activity.fileUrl || "",
        });
      } catch (error) {
        alert("Failed to load activity data");
        navigate("/activities");
      }
    };
    fetchActivity();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/activities/updateActivity/${id}`, form);
      alert("Activity updated successfully!");
      navigate("/activities");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Activity</h2>

      <div className="mb-5">
        <label className="block font-semibold mb-2" htmlFor="title">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter activity title"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-2" htmlFor="type">
          Type <span className="text-red-600">*</span>
        </label>
        <select
          id="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select activity type
          </option>
          {types.map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-2" htmlFor="description">
          Description <span className="text-red-600">*</span>
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your activity"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-2" htmlFor="date">
          Date <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          id="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2" htmlFor="fileUrl">
          File URL
        </label>
        <input
          type="url"
          id="fileUrl"
          value={form.fileUrl}
          onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Optional - link to certificate or document"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Update Activity
      </button>
    </form>
  );
};

export default EditActivity;
