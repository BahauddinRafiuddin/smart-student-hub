import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import AuthLeftAside from "../../components/common/AuthLeftAside.jsx";
import LoginImg from "../../assets/Login.png";

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
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  return (
    <section className="gradient-form min-h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="w-full">
        <div className="  block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="min-h-screen g-0 lg:flex lg:flex-wrap">
            {/* left side */}
            <AuthLeftAside/>

            {/* right side */}
            <div className="flex items-center justify-center min-h-screen bg-white px-4 md:px-0 lg:w-6/12">
              <div className="w-full md:mx-6 md:p-12">
                <div className="text-center mb-3">
                  <img
                    className="mx-auto w-48"
                    src={LoginImg}
                    alt="logo"
                  />
                  <h4 className="mb-12 mt-1 pb-1 font-semibold text-2xl text-gray-800  text-center">
                    Student Login
                  </h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      required
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                    />
                  </div>

                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      required
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      type="password"
                      value={form.password}
                    />
                  </div>

                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 border-1 rounded-full py-3 mt-6 flex justify-center items-center font-semibold"
                    >
                      Login
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-6">
                      Don’t have an account?{" "}
                      <Link
                        className="text-blue-600 hover:underline"
                        to="/register"
                      >
                        Register now
                      </Link>
                    </p>
                    <p className="text-center text-gray-500 text-sm mt-2">

                      <Link
                        className="text-blue-600 hover:underline"
                        to="/admin/login"
                      >
                        Admin Login ?
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
