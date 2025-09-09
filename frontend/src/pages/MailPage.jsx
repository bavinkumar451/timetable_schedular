import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Download } from "lucide-react";

export default function MailPage() {
  const [subject, setSubject] = useState("Approved Timetable");
  const [message, setMessage] = useState(
    "Dear students and staff,\n\nPlease find the approved timetable attached.\n\nRegards,\nAdmin"
  );

  const sendMail = () => {
    alert(
      "📩 Mail sending not implemented. Hook this to backend to send to students & staff."
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-purple-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Mail Timetable
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Send the approved timetable to all registered students and staff.
            </p>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
              />
            </div>

            {/* Recipients */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Recipients:</span> All students
                and faculty members linked to this timetable.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={sendMail}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                <Send size={18} /> Send Mail
              </button>
              <button
                onClick={() => alert("⬇️ Download timetable (implement)")}
                className="flex items-center gap-2 bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-300 transition"
              >
                <Download size={18} /> Download PDF
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
