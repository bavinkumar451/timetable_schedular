import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SubjectSelector from "../components/SubjectSelector";
import TimetableTable from "../components/TimetableTable";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const periods = [
  "9:00 - 9:50",
  "10:00 - 10:50",
  "11:00 - 11:50",
  "12:00 - 12:50",
  "1:00 - 1:50",
  "2:00 - 2:50",
  "3:00 - 3:50",
  "4:00 - 4:50",
];

const initialTimetable = {
  Monday: Object.fromEntries(periods.map((p) => [p, null])),
  Tuesday: Object.fromEntries(periods.map((p) => [p, null])),
  Wednesday: Object.fromEntries(periods.map((p) => [p, null])),
  Thursday: Object.fromEntries(periods.map((p) => [p, null])),
  Friday: Object.fromEntries(periods.map((p) => [p, null])),
};

export default function TimetableCreation() {
  const [subjects] = useState(["DBMS", "AI", "OS", "Networks"]);
  const [timetable, setTimetable] = useState(initialTimetable);
  const [showRuleBox, setShowRuleBox] = useState(false);
  const [rules, setRules] = useState("");

  // Add class to a specific day and period
  const addClass = (
    subject,
    day = "Monday",
    period = periods[0],
    faculty = "TBD"
  ) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: { subject, faculty },
      },
    }));
  };

  // Auto-generate timetable (simple round-robin allocation)
  const autoGenerate = () => {
    const newTimetable = { ...initialTimetable };
    const days = Object.keys(newTimetable);

    subjects.forEach((s, i) => {
      const day = days[i % days.length];
      const period = periods[i % periods.length];
      newTimetable[day][period] = { subject: s, faculty: "Auto" };
    });

    setTimetable(newTimetable);
  };

  // Generate timetable using rules (placeholder for AI logic)
  const generateWithRules = () => {
    alert(`Generating timetable using rules:\n${rules}`);
    setShowRuleBox(false);
  };

  return (
    <div className="min-h-screen flex bg-indigo-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4 gap-2">
              <Cpu size={20} className="text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Subjects & Allocation
              </h3>
            </div>
            <p className="text-gray-500 mb-4 text-sm">
              Select subjects and allocate them to periods. You can also define
              rules for AI generation.
            </p>

            <SubjectSelector
              subjects={subjects}
              onAdd={(s) => addClass(s, "Monday", periods[0])}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                onClick={autoGenerate}
              >
                Generate Timetable (AI)
              </button>

              {/* Add Rule Button */}
              <button
                className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                onClick={() => setShowRuleBox((prev) => !prev)}
              >
                Add Rule
              </button>

              <button
                className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                onClick={() => alert("Save -> send to HOD (implement backend)")}
              >
                Save & Send for Approval
              </button>
            </div>

            {/* Rule Input Box */}
            {showRuleBox && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                <textarea
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  placeholder="Enter rules for timetable generation..."
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows={4}
                />
                <button
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                  onClick={generateWithRules}
                >
                  Generate With Rules
                </button>
              </div>
            )}
          </motion.div>

          {/* Generated Timetable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Generated Timetable
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Timetable is updated in real-time. Review before sending for
              approval.
            </p>
            <TimetableTable timetable={timetable} periods={periods} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
