import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import AuthLeftAside from "../../components/common/AuthLeftAside.jsx";
import LoginImg from "../../assets/Login.png";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    Birth_date: "",
    email: "",
    phone: "",
    password: "",
    role_id:"68ff36bf65fc8571d8e54664"
  });

  const handleForm = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && value !== "" && !/^\d+$/.test(value)) return;
    else if (
      (name === "first_name" ||
        name === "middle_name" ||
        name === "last_name") &&
      value !== "" &&
      !/^[A-Za-z\s]+$/.test(value)
    )
      return;

    setForm({ ...form, [name]: value.trimStart() });
  };

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
            <AuthLeftAside />

            {/* right side */}
            <div className="flex items-center justify-center min-h-screen bg-white px-4 md:px-4 lg:w-6/12">
              <div className="w-full md:mx-4 md:p-2">
                <div className="text-center mb-2">
                  <img
                    className="mx-auto w-48"
                    style={{ width: "150px" }}
                    src={LoginImg}
                    alt="logo"
                  />
                  <h4 className="mb-6 mt-1 pb-1 font-semibold text-2xl text-gray-800  text-center">
                  Register
                  </h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    {[
                      { label: "First Name", name: "first_name", type: "text",placeholder:"romon" },
                      {
                        label: "Middle Name",
                        name: "middle_name",
                        type: "text",
                        placeholder:"basle"
                      },
                    ].map(({ label, name, type,placeholder }, key) => (
                      <div
                        key={key}
                        className="relative mb-4"
                        data-twe-input-wrapper-init
                      >
                        <label className="block text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={form[name]}
                          onChange={handleForm}
                          placeholder={placeholder}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={true}
                        />
                      </div>
                    ))}
                  </div>
                
                  {/* ------without grid---------- */}
                  {[
                     { label: "Last Name", name: "last_name", type: "text" , placeholder:"joy"},
                    { label: "Email", name: "email", type: "email" , placeholder:"example@gmail.com"},
                    { label: "Phone", name: "phone", type: "text" , placeholder:"0000000000"},
                    { label: "Password", name: "password", type: "password", placeholder:"••••••••" },
                  ].map(({ label, name, type,placeholder }, key) => (
                    <div
                      key={key}
                      className="relative mb-4"
                      data-twe-input-wrapper-init
                    >
                      <label className="block text-gray-700 mb-1">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleForm}
                        placeholder={placeholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={true}
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
