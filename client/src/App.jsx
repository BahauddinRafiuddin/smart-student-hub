import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Import your new dashboard layout (New)
import DashboardLayout from "./layout/AppLayout.jsx";

// Import existing pages
import Login from "./pages/student/Login.jsx";
import Register from "./pages/student/Register";
import AdminLogin from "./pages/admin/AdminLogin";

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
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Dashboard Routes (with sidebar) */}
        <Route path="/dashboard" element={
          <Private>
            <DashboardLayout />
          </Private>
        }>
          <Route index element={()=><h1>Working</h1>} />
          
          {/* Student/Faculty Routes */}
          {/* <Route path="my-activities" element={<Activities />} />
          <Route path="add-activity" element={<AddActivity />} />
          <Route path="activity/:id/edit" element={<EditActivity />} />
          <Route path="portfolio" element={<Portfolio/>}/>
           */}
          {/* Admin Routes */}
          {/* <Route path="activities" element={<AdminDashboard />} />
          <Route path="reports" element={<div className="p-6"><h1 className="text-2xl">Reports Coming Soon</h1></div>} />
          <Route path="users" element={<div className="p-6"><h1 className="text-2xl">User Management Coming Soon</h1></div>} />
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl">Settings Coming Soon</h1></div>} /> */}
          
          {/* Placeholder routes for future pages */}
           {/* <Route path="portfolio" element={<div className="p-6"><h1 className="text-2xl">Portfolio Coming Soon</h1></div>} />
          <Route path="student-activities" element={<div className="p-6"><h1 className="text-2xl">Student Activities Coming Soon</h1></div>} /> */}
        </Route> 

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
