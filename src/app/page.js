"use client";
import { useState } from "react";
import Header from "./Header";
import jsPDF from "jspdf";

export default function Home() {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  // ...existing code...
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  setFileSelected(!!file);
  setFileName(file ? file.name : "");
  };

  // ...existing code...

  return (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center p-0">
      <div className="w-full sticky top-0 z-20"><Header /></div>
      <section className="w-full min-h-[60vh] bg-white rounded-none sm:rounded-2xl shadow-2xl p-4 sm:p-12 mt-6 flex flex-col gap-8 border border-blue-100">
        <form className="flex flex-col gap-8 w-full">
          <div className="w-full">
            <label htmlFor="resume" className="block text-2xl font-bold mb-4 text-blue-900">Upload Resume (PDF)</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept="application/pdf"
              className={`w-full border rounded-none sm:rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-xl transition-all text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:bg-blue-100 cursor-pointer ${fileSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
              onChange={handleFileChange}
            />
            {fileSelected && fileName && (
              <span className="block mt-3 text-lg font-bold text-gray-900">{fileName}</span>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="jobRequirements" className="block text-2xl font-bold mb-4 text-blue-900">Job Requirements</label>
            <textarea id="jobRequirements" name="jobRequirements" rows={14} placeholder="Paste job requirements here..." className="w-full border rounded-none sm:rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-xl resize-none text-gray-900 placeholder-gray-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-none sm:rounded-xl hover:bg-blue-700 transition text-xl">Generate Cover Letter</button>
        </form>
      </section>
    </main>
  );
}

