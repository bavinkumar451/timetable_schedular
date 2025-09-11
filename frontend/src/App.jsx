import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Home from "./pages/Home";
import TimetableCreation from "./pages/TimetableCreation";
import ApprovalPage from "./pages/ApprovalPage";
import UpdateTimetable from "./pages/UpdateTimetable";
import MailPage from "./pages/MailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected */}
      <Route
        path="/home"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetable"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <TimetableCreation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/approval"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <ApprovalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <UpdateTimetable />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/mail"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <MailPage />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="*"
        element={<Navigate to={user ? "/home" : "/"} replace />}
      />
    </Routes>
  );
}
