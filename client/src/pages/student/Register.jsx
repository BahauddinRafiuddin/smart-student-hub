import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import LoginImg from "../../assets/Login.png";

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
      toast.warning(err.response?.data?.message || err.message);
    }
  };
  return (
    <section className="gradient-form min-h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="w-full">
        <div className="  block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="min-h-screen g-0 lg:flex lg:flex-wrap">
            {/* left side */}
            <div className="hidden lg:flex bg-blue-700 items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none">
              <div className=" py-6 text-white md:mx-6 md:p-12">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample image"
                />
              </div>
            </div>

            {/* right side */}
            <div className="flex items-center justify-center min-h-screen bg-white px-4 md:px-4 lg:w-6/12">
              <div className="w-full md:mx-4 md:p-2">
                <div className="text-center mb-2">
                  <img className="mx-auto w-48" style={{width:"150px" }} src={LoginImg} alt="logo" />
                  <h4 className="mb-6 mt-1 pb-1 font-semibold text-2xl text-gray-800  text-center">
                    Student Register
                  </h4>
                </div>
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Password", name: "password", type: "password" },
                    { label: "Roll No", name: "rollNo", type: "text" },
                    { label: "Course", name: "course", type: "text" },
                    { label: "Year", name: "year", type: "number" },
                  ].map(({ label, name, type }) => (
                    <div className="relative mb-4" data-twe-input-wrapper-init>
                      <label className="block text-gray-700 mb-1">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={form[name]}
                        onChange={(e) =>
                          setForm({ ...form, [name]: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={
                          name !== "rollNo" &&
                          name !== "course" &&
                          name !== "year"
                            ? true
                            : false
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 border-1 rounded-full py-3 mt-6 flex justify-center items-center font-semibold"
                  >
                    Register
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{" "}
                    <Link className="text-blue-600 hover:underline" to="/login">
                      Login now
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
