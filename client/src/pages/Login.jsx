import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 px-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Info Panel */}
        <div className="p-8 bg-blue-600 text-white flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Smart Student Hub</h1>
          <p className="text-sm mb-6 leading-relaxed">
            Empowering students and faculty with a unified platform to track, 
            manage, and showcase academic and extracurricular activities. 
            Generate portfolios, approve submissions, and gain actionable insights 
            all in one place.
          </p>
          <ul className="space-y-3 text-sm">
            <li>• Submit & track activities</li>
            <li>• Download personalized portfolios</li>
            <li>• Faculty review and approve entries</li>
            <li>• Admin management & reporting</li>
          </ul>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
