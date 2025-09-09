import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  Edit3,
  CheckCircle,
  Mail,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/home", label: "Dashboard", icon: LayoutDashboard },
    { to: "/timetable", label: "Create Timetable", icon: CalendarPlus },
    { to: "/update", label: "Update Timetable", icon: Edit3 },
    { to: "/approval", label: "Approval", icon: CheckCircle },
    { to: "/mail", label: "Mail Timetable", icon: Mail },
  ];

  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white border-r hidden md:flex flex-col shadow-lg"
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h2 className="font-bold text-xl">⏰ TimeSchedular</h2>
        <p className="text-sm text-indigo-100">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-500">
        © 2025 TimeSchedular
      </div>
    </motion.aside>
  );
}
