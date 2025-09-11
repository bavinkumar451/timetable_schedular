import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SubjectSelector from "../components/SubjectSelector";
import TimetableTable from "../components/TimetableTable";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Cpu, Trash2 } from "lucide-react";

const periods = [
  "9:00 - 9:50",
  "10:00 - 10:50",
  "11:00 - 11:50", // Tea break
  "12:00 - 12:50",
  "1:00 - 1:50", // Lunch break
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

// Subjects based on department & year
const subjectMapping = {
  IT: {
    1: ["Maths", "Physics", "Chemistry", "Electronics"],
    2: ["DBMS", "OS", "Networks", "Maths"],
    3: ["AI", "ML", "Cloud", "Big Data"],
    4: ["Deep Learning", "Blockchain", "IoT", "Cybersecurity"],
  },
  CSE: {
    1: ["Maths", "Physics", "Programming C", "Electronics"],
    2: ["DBMS", "OS", "DSA", "Networks"],
    3: ["AI", "Compiler", "CN", "SE"],
    4: ["ML", "Cloud", "Blockchain", "Cybersecurity"],
  },
};

// Vibrant subject colors
const subjectColors = [
  "bg-red-500 text-white",
  "bg-green-500 text-white",
  "bg-blue-500 text-white",
  "bg-yellow-400 text-black",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",
  "bg-indigo-500 text-white",
  "bg-orange-500 text-white",
  "bg-teal-500 text-white",
  "bg-lime-400 text-black",
];

// Special color for breaks/lunch
const breakColor = "bg-gray-600 text-white";

export default function TimetableCreation() {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [Faculty] = useState([
    "Dr. Rao",
    "Prof. Mehta",
    "Dr. Sharma",
    "Dr. Gupta",
    "Prof. Singh",
    "Dr. Verma",
    "Prof. Iyer",
    "Dr. Nair",
    "Prof. Das",
    "Dr. Khan",
  ]);
  const [timetable, setTimetable] = useState(initialTimetable);
  const [showRuleBox, setShowRuleBox] = useState(false);
  const [rules, setRules] = useState("");

  // "Add to Cart" state
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Subjects based on dept + year
  const subjects = useMemo(() => {
    if (department && year && subjectMapping[department]) {
      return subjectMapping[department][year] || [];
    }
    return [];
  }, [department, year]);

  // Color map for selected subjects
  const subjectColorMap = useMemo(() => {
    let map = {};
    selectedSubjects.forEach((s, i) => {
      map[s] = subjectColors[i % subjectColors.length];
    });
    map["Break"] = breakColor;
    map["Lunch"] = breakColor;
    return map;
  }, [selectedSubjects]);

  // Add subject to "cart"
  const handleAddSubject = (subject) => {
    if (!selectedSubjects.includes(subject)) {
      setSelectedSubjects((prev) => [...prev, subject]);
    }
  };

  // Remove subject from "cart"
  const handleRemoveSubject = (subject) => {
    setSelectedSubjects((prev) => prev.filter((s) => s !== subject));
  };

  // Auto-generate timetable
  const autoGenerate = () => {
    if (selectedSubjects.length === 0) {
      alert("Please add subjects first!");
      return;
    }

    const newTimetable = { ...initialTimetable };
    const days = Object.keys(newTimetable);

    const breakPeriods = ["11:00 - 11:50"];
    const lunchPeriod = "1:00 - 1:50";

    const slotsPerWeek =
      days.length * (periods.length - (breakPeriods.length + 1));

    // Create subject pool
    let subjectPool = [];
    const repeatCount = Math.ceil(slotsPerWeek / selectedSubjects.length);
    selectedSubjects.forEach((s) => {
      for (let i = 0; i < repeatCount; i++) {
        subjectPool.push(s);
      }
    });

    // Shuffle function
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    subjectPool = shuffle(subjectPool);

    days.forEach((day) => {
      let prevSubject = null;
      const facultyAssigned = {};

      periods.forEach((period) => {
        if (breakPeriods.includes(period)) {
          newTimetable[day][period] = { subject: "Break", faculty: "-" };
          return;
        }
        if (period === lunchPeriod) {
          newTimetable[day][period] = { subject: "Lunch", faculty: "-" };
          return;
        }

        let subject, faculty;
        let tries = 0;

        do {
          if (subjectPool.length === 0) {
            subjectPool = shuffle(
              selectedSubjects.flatMap((s) =>
                Array.from({ length: repeatCount }, () => s)
              )
            );
          }
          subject = subjectPool.pop();
          faculty = Faculty[Math.floor(Math.random() * Faculty.length)];
          tries++;
          if (tries > 100) break;
        } while (subject === prevSubject);

        newTimetable[day][period] = {
          subject: subject || "TBD",
          faculty: faculty || "TBD",
        };

        prevSubject = subject;
        facultyAssigned[period] = faculty;
      });
    });

    setTimetable(newTimetable);
  };

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
                Year, Department & Subjects
              </h3>
            </div>

            {/* Year & Department */}
            <div className="flex gap-4 mb-4">
              <select
                className="border p-2 rounded"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>

              <select
                className="border p-2 rounded"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
              </select>
            </div>

            <p className="text-gray-500 mb-4 text-sm">
              Select year & department → add subjects to your list. Only these
              subjects will be used in timetable generation.
            </p>

            {subjects.length > 0 && (
              <SubjectSelector
                subjects={subjects}
                onAdd={(s) => handleAddSubject(s)}
              />
            )}

            {/* Selected Subjects "Cart" */}
            {selectedSubjects.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Selected Subjects:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubjects.map((s) => (
                    <span
                      key={s}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${subjectColorMap[s]}`}
                    >
                      {s}
                      <button
                        onClick={() => handleRemoveSubject(s)}
                        className="text-red-200 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                onClick={autoGenerate}
              >
                Generate Timetable (AI)
              </button>

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
              Timetable is generated only from selected subjects.
            </p>
            <TimetableTable
              timetable={timetable}
              periods={periods}
              subjectColorMap={subjectColorMap}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
