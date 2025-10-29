import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Import your new dashboard layout (New)
import DashboardLayout from "./layout/AppLayout.jsx";

// Import existing pages
import Login from "./pages/student/Login.jsx";
import Register from "./pages/student/Register";
import ForgotPassword from "./pages/ForgotPassword.jsx";

// Existing pages that will be used in dashboard (OLD)
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import EditActivity from "./pages/EditActivity";
import AdminDashboard from "./pages/AdminDashboard";
import Portfolio from "./pages/Portfolio.jsx";
//old finished---------

//  Existing pages that will be used in dashboard (NEW)
const Private = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <>
       {/* To show messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Routes>
        {/* Auth Routes (without sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Dashboard Routes (with sidebar) */}
        <Route path="/dashboard" element={
          <Private>
            <DashboardLayout />
          </Private>
        }>
          <Route index element={()=><h1>Working</h1>} />
          
          </Route> 

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
