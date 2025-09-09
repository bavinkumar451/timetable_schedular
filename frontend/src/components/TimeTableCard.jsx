import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, CalendarDays } from "lucide-react";

export default function TimetableCard({ timetable }) {
  const statusStyles = {
    approved: {
      bg: "bg-green-100 text-green-700",
      icon: <CheckCircle size={16} className="mr-1" />,
    },
    pending: {
      bg: "bg-yellow-100 text-yellow-700",
      icon: <Clock size={16} className="mr-1" />,
    },
    rejected: {
      bg: "bg-red-100 text-red-700",
      icon: <XCircle size={16} className="mr-1" />,
    },
  };

  const status = timetable.status || "pending";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0px 8px 20px rgba(0,0,0,0.12)" }}
      className="bg-white rounded-xl border shadow-sm overflow-hidden transition"
    >
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">
            {timetable.department} — Sem {timetable.semester}
          </h3>
          <p className="text-xs text-indigo-200 flex items-center mt-1">
            <CalendarDays size={14} className="mr-1" />
            Created: {timetable.createdAt || "—"}
          </p>
        </div>
        <span
          className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status].bg}`}
        >
          {statusStyles[status].icon}
          {status}
        </span>
      </div>

      {/* Schedule */}
      <div className="p-4 text-sm text-gray-700">
        {Object.keys(timetable.schedule || {}).length === 0 ? (
          <p className="italic text-gray-400">No schedule available</p>
        ) : (
          Object.keys(timetable.schedule || {}).map((day, i) => (
            <div key={i} className="mb-3">
              <div className="font-semibold text-indigo-700">{day}</div>
              <div className="ml-3 mt-1 space-y-1">
                {(timetable.schedule[day] || []).map((cls, j) => (
                  <div
                    key={j}
                    className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md border text-gray-600"
                  >
                    <span className="font-medium">{cls.subject}</span>
                    <span className="text-xs">{cls.faculty}</span>
                    <span className="text-xs font-semibold text-indigo-600">
                      {cls.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
