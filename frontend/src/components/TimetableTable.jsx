import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";

export default function TimetableTable({ timetable }) {
  const days = Object.keys(timetable || {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto rounded-lg border shadow-md bg-white"
    >
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-indigo-600 text-white text-left">
            <th className="p-3 font-semibold">Day</th>
            <th className="p-3 font-semibold">Classes</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, i) => (
            <tr
              key={day}
              className={`${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-indigo-50 transition`}
            >
              {/* Day Column */}
              <td className="p-3 border-r font-semibold text-gray-800 align-top">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  {day}
                </div>
              </td>

              {/* Classes Column */}
              <td className="p-3">
                {(timetable[day] || []).length === 0 ? (
                  <span className="text-gray-400 italic">No classes</span>
                ) : (
                  <div className="space-y-2">
                    {(timetable[day] || []).map((c, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-100 border rounded-md px-3 py-2 hover:shadow-sm"
                      >
                        <div className="font-medium text-gray-700">
                          {c.subject}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {c.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={14} /> {c.faculty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
