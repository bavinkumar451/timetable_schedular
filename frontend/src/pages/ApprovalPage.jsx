import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Calendar, User } from "lucide-react";

export default function ApprovalPage() {
  const [status, setStatus] = useState("pending");

  const approve = () => {
    setStatus("approved");
    alert("✅ Timetable approved — email sending can be triggered in backend.");
  };

  const reject = () => {
    setStatus("rejected");
    alert("❌ Timetable rejected. Returned to creator.");
  };

  // Mock timetable metadata
  const timetableInfo = {
    department: "CSE",
    semester: 5,
    createdBy: "Prof. Sharma",
    createdAt: "2025-09-08",
    schedule: {
      Monday: [{ subject: "DBMS", faculty: "Dr. Rao", time: "10-11 AM" }],
      Tuesday: [{ subject: "AI", faculty: "Prof. Mehta", time: "11-12 AM" }],
    },
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-2">Approval Panel</h2>

          {/* Timetable Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-indigo-600" size={18} /> Timetable
              Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-medium">Department:</span>{" "}
                {timetableInfo.department}
              </p>
              <p>
                <span className="font-medium">Semester:</span>{" "}
                {timetableInfo.semester}
              </p>
              <p className="flex items-center gap-1">
                <User size={14} className="text-indigo-500" />
                <span>
                  <span className="font-medium">Created By:</span>{" "}
                  {timetableInfo.createdBy}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <Clock size={14} className="text-indigo-500" />
                <span>
                  <span className="font-medium">Created On:</span>{" "}
                  {timetableInfo.createdAt}
                </span>
              </p>
            </div>

            {/* Status */}
            <div className="mt-6">
              <p className="font-medium mb-2">Current Status:</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status === "approved"
                    ? "bg-green-100 text-green-800"
                    : status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.toUpperCase()}
              </span>
            </div>
          </motion.div>

          {/* Schedule Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Schedule Preview</h3>
            <div className="space-y-3 text-sm">
              {Object.keys(timetableInfo.schedule).map((day) => (
                <div key={day}>
                  <p className="font-medium text-gray-800">{day}</p>
                  <ul className="ml-4 list-disc text-gray-600">
                    {timetableInfo.schedule[day].map((cls, idx) => (
                      <li key={idx}>
                        {cls.subject} — {cls.faculty} ({cls.time})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
          >
            <p className="text-gray-700">
              Please review the timetable before making your decision.
            </p>
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
                onClick={approve}
              >
                <CheckCircle size={18} /> Approve
              </button>
              <button
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow"
                onClick={reject}
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
          </motion.div> */}
        </main>
      </div>
    </div>
  );
}
