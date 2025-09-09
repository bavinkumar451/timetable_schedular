import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TimetableCard from "../components/TimeTableCard";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuthContext();

  const mockTimetables = [
    {
      department: "CSE",
      semester: 5,
      status: "pending",
      schedule: {
        Monday: [{ subject: "DBMS", faculty: "Dr. Rao", time: "10-11 AM" }],
        Tuesday: [{ subject: "AI", faculty: "Prof. Mehta", time: "11-12 AM" }],
      },
      createdAt: "2025-09-08",
    },
    {
      department: "IT",
      semester: 3,
      status: "approved",
      schedule: {
        Monday: [{ subject: "OS", faculty: "Dr. Sharma", time: "9-10 AM" }],
      },
      createdAt: "2025-09-05",
    },
  ];

  const stats = [
    { label: "Total Timetables", value: 12 },
    { label: "Pending Approvals", value: 4 },
    { label: "Approved", value: 7 },
    { label: "Rejected", value: 1 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 space-y-10">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-2xl font-bold">
              Welcome back, {user?.name || "Admin"} 👋
            </h2>
            <p className="text-sm text-indigo-100 mt-2">
              Here’s what’s happening with your timetables today.
            </p>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Timetable Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Timetables
            </h3>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {mockTimetables.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl shadow-md hover:shadow-xl transition bg-white"
                >
                  <TimetableCard timetable={t} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
