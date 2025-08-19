"use client";
import { useState } from "react";
import Header from "./Header";
import jsPDF from "jspdf";
import { generateCoverLetterAPI } from "../lib/api";

export default function Home() {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_BYTES) {
      setError(`File too large (> ${(MAX_FILE_BYTES / (1024 * 1024)).toFixed(1)}MB).`);
      setFileSelected(false);
      setFileName("");
      setResumeFile(null);
      return;
    }
    setError("");
    setFileSelected(!!file);
    setFileName(file ? file.name : "");
    setResumeFile(file || null);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    if (!resumeFile) {
      setError("Please select a PDF resume first.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste job description.");
      return;
    }
    try {
      setLoading(true);
      const data = await generateCoverLetterAPI({
        resumeFile,
        jobRequirements: jobDescription,
      });
      if (data.cover_letter) setCoverLetter(data.cover_letter);
      else if (data.coverLetter) setCoverLetter(data.coverLetter);
      if (!data.cover_letter && !data.coverLetter) {
        setCoverLetter("(No cover letter returned by API)");
      }
    } catch (err) {
      setError(err.message || "Failed to generate.");
    } finally {
      setLoading(false);
    }
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
  <div className="w-full md:w-[45%] h-[100%] bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-blue-100 flex flex-col justify-between">
          <form className="flex flex-col w-full h-full" onSubmit={handleGenerate}>
            <div className="w-full">
              <label htmlFor="resume" className="block text-base font-semibold leading-tight text-blue-900">Upload Resume (PDF)</label>
              <div className="mt-1">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept="application/pdf"
                  className={`w-full border rounded px-2 py-2 text-base transition-all text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:bg-blue-100 cursor-pointer ${fileSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                  onChange={handleFileChange}
                />
              </div>
              {fileSelected && fileName && (
                <span className="block mt-1 text-sm font-semibold text-gray-900 break-words">{fileName}</span>
              )}
            </div>
            <div className="w-full flex-1 flex flex-col mt-2">
              <label htmlFor="jobDescription" className="block text-base font-semibold leading-tight text-blue-900">Job Description</label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full flex-1 mt-1 border rounded px-2 py-2 text-base resize-none text-gray-900 placeholder-gray-500 min-h-[140px]"
              />
            </div>
            <div className="mt-3">
              <button type="submit" disabled={loading} className="w-full bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2 rounded hover:bg-blue-700 transition text-base">
                {loading ? 'Generating...' : 'Generate Cover Letter'}
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
          </form>
        </div>
        {/* Generated Cover Letter Section */}
  <div className="w-full md:w-[55%] h-[100%] bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-blue-100 flex flex-col">
          <div className="flex flex-col flex-1">
            <label className="block text-base font-semibold leading-tight text-blue-900">Generated Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              placeholder="Your generated cover letter will appear here..."
              className="w-full flex-1 mt-1 border rounded px-2 py-2 text-base resize-none text-gray-900 font-mono min-h-[140px]"
            />
          </div>
          <div className="mt-3">
            <button onClick={handleDownloadPDF} className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition text-base">Download PDF</button>
          </div>
        </div>
      </section>
    </main>
  );
}

