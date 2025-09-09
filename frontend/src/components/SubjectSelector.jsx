import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function SubjectSelector({ subjects = [], onAdd }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h4 className="font-bold text-lg text-gray-800 mb-4">
        Available Subjects
      </h4>
      <div className="space-y-3">
        {subjects.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md bg-gray-50 transition"
          >
            <span className="font-medium text-gray-700">{s}</span>
            <button
              onClick={() => onAdd(s)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Plus size={16} />
              Add
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
