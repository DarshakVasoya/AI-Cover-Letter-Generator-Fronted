"use client";
import { useState } from "react";
import Header from "./Header";
import jsPDF from "jspdf";

export default function Home() {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileSelected(!!file);
    setFileName(file ? file.name : "");
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    // Simulate AI generation
    setCoverLetter(
      `Dear Hiring Manager,\n\nBased on your requirements: ${jobRequirements}\n\nI am excited to apply for this position. My resume aligns well with your needs, and I am confident I can contribute to your team.\n\nSincerely,\nYour Name`
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(coverLetter, 10, 20);
    doc.save("cover-letter.pdf");
  };

  return (
  <main className="h-screen bg-gray-50 flex flex-col items-center p-0">
      <div className="w-full sticky top-0 z-20"><Header /></div>
  <section className="w-full h-[92%] flex flex-col md:flex-row gap-6 p-2 sm:p-8">
        {/* Form Section */}
  <div className="w-full md:w-[45%] h-[100%] bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-blue-100 flex flex-col gap-6 justify-between">
          <form className="flex flex-col gap-0 w-full h-full justify-between" onSubmit={handleGenerate}>
            <div className="w-full h-[20%]">
              <label htmlFor="resume" className="block text-base font-semibold mb-2 text-blue-900">Upload Resume (PDF)</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept="application/pdf"
                className={`w-full h-[40%] border rounded px-2 py-2 text-base transition-all text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:bg-blue-100 cursor-pointer ${fileSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                onChange={handleFileChange}
              />
              {fileSelected && fileName && (
                <span className="block mt-2 text-base font-semibold text-gray-900">{fileName}</span>
              )}
            </div>
            <div className="w-full flex-1 flex flex-col">
              <label htmlFor="jobRequirements" className="block text-base font-semibold mb-2 text-blue-900">Job Requirements</label>
              <textarea
                id="jobRequirements"
                name="jobRequirements"
                value={jobRequirements}
                onChange={e => setJobRequirements(e.target.value)}
                placeholder="Paste job requirements here..."
                className="w-full flex-1 border rounded px-2 py-2 text-base resize-none text-gray-900 placeholder-gray-500 min-h-[120px]"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition text-base mt-auto">Generate Cover Letter</button>
          </form>
        </div>
        {/* Generated Cover Letter Section */}
  <div className="w-full md:w-[55%] h-[100%] bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-blue-100 flex flex-col justify-between">
          <label className="block text-base font-semibold mb-2 text-blue-900">Generated Cover Letter</label>
          <textarea
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
            placeholder="Your generated cover letter will appear here..."
            className="w-full flex-1 border rounded px-2 py-2 text-base resize-none text-gray-900 font-mono min-h-[120px] mb-4"
          />
          <button onClick={handleDownloadPDF} className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition text-base mt-auto">Download PDF</button>
        </div>
      </section>
    </main>
  );
}

