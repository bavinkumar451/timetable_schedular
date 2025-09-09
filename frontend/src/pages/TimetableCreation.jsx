import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TimetableTable from "../components/TimetableTable";
import SubjectSelector from "../components/SubjectSelector";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function TimetableCreation() {
  const [subjects] = useState(["DBMS", "AI", "OS", "Networks"]);
  const initial = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };
  const [timetable, setTimetable] = useState(initial);

  const addToDay = (subject, day = "Monday") => {
    setTimetable((prev) => ({
      ...prev,
      [day]: [...prev[day], { subject, faculty: "TBD", time: "10:00 - 11:00" }],
    }));
  };

  const autoGenerate = () => {
    const gen = { ...initial };
    const days = Object.keys(gen);
    subjects.forEach((s, i) => {
      const day = days[i % days.length];
      gen[day].push({
        subject: s,
        faculty: "Auto",
        time: `${9 + (i % 3)}:00 - ${10 + (i % 3)}:00`,
      });
    });
    setTimetable(gen);
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
              Select subjects and allocate them to Monday (you can auto-generate
              for all days).
            </p>
            <SubjectSelector
              subjects={subjects}
              onAdd={(s) => addToDay(s, "Monday")}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                onClick={autoGenerate}
              >
                Generate Timetable (AI)
              </button>
              <button
                className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                onClick={() => alert("Save -> send to HOD (implement backend)")}
              >
                Save & Send for Approval
              </button>
            </div>
          </motion.div>

          {/* Generated Timetable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Generated Timetable
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Timetable is updated in real-time. Review before sending for
              approval.
            </p>
            <TimetableTable timetable={timetable} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
