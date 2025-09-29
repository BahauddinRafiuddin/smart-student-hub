import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNo: "",
    course: "",
    year: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Roll No", name: "rollNo", type: "text" },
          { label: "Course", name: "course", type: "text" },
          { label: "Year", name: "year", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label className="block mb-1">{label}</label>
            <input
              type={type}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              className="w-full p-2 border rounded"
              required={
                name !== "rollNo" && name !== "course" && name !== "year"
                  ? true
                  : false
              }
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
