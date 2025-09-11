import { motion } from "framer-motion";

export default function TimetableTable({
  timetable,
  periods,
  subjectColorMap,
}) {
  const days = Object.keys(timetable || {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto rounded-lg border shadow-md bg-white p-4"
    >
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-indigo-600 text-white text-xs">
            <th className="p-2 border-r">Day / Period</th>
            {periods.map((p, idx) => (
              <th key={idx} className="p-2 border-r text-center">
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, idx) => (
            <tr key={idx} className="text-xs">
              <td className="p-2 font-semibold border-r text-indigo-700">
                {day}
              </td>

              {periods.map((periodTime, pIdx) => {
                const cls = timetable[day][periodTime];
                const colorClass = cls
                  ? subjectColorMap[cls.subject] || "bg-gray-200 text-gray-700"
                  : "bg-gray-100";

                return (
                  <td
                    key={pIdx}
                    className={`p-2 border text-center align-middle ${colorClass} rounded-md transition`}
                  >
                    {cls ? (
                      <div className="flex flex-col text-xs font-semibold">
                        <span>{cls.subject}</span>
                        {cls.faculty !== "-" && (
                          <span className="font-normal">{cls.faculty}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
