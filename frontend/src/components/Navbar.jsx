import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 flex items-center justify-between shadow"
    >
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-lg">Timetable System</h1>
        <nav className="hidden md:flex gap-4 text-sm">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/timetable" className="hover:underline">
            Timetable
          </Link>
          <Link to="/approval" className="hover:underline">
            Manage Approval
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm">
              Welcome,{" "}
              <span className="font-semibold">{user.name || user.email}</span>
            </div>
            <button
              onClick={logout}
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="text-sm underline">
            Sign in
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
