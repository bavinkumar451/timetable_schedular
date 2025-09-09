import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserX } from "lucide-react";

export default function UpdateTimetable() {
  const [absentFaculty, setAbsentFaculty] = useState("");
  const [replacement, setReplacement] = useState("");

  const applyReplacement = () => {
    alert(
      `Replace ${absentFaculty} with ${replacement} (implement backend to update timetable).`
    );
  };

  return (
    <div className="min-h-screen flex bg-indigo-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 grid place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex items-center mb-4 gap-2">
              <UserX size={24} className="text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Update Timetable
              </h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">
              If a faculty is absent, you can assign a replacement here. Changes
              will reflect in the timetable.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Absent Faculty
                </label>
                <input
                  value={absentFaculty}
                  onChange={(e) => setAbsentFaculty(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                  placeholder="Enter name of absent teacher"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Replacement Faculty
                </label>
                <input
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  placeholder="Enter name of replacement teacher"
                />
              </div>

              <button
                onClick={applyReplacement}
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Apply Replacement
              </button>
            </div>

            <div className="mt-6 text-gray-500 text-sm">
              * Ensure that the replacement faculty is available for the
              selected time slots.
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
