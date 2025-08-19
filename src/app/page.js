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
      setError("File too large (>8MB)." );
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
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 56; // 0.78in
    const marginTop = 64;
    const lineHeight = 16;
    const maxWidth = pageWidth - marginX * 2;

    doc.setFont('Times', 'Normal');
    doc.setFontSize(12);

    const raw = (coverLetter || '').replace(/\r\n?/g, '\n').trim();
    if (!raw) {
      doc.text('No cover letter content.', marginX, marginTop);
      doc.save('cover-letter.pdf');
      return;
    }
    // Group into paragraphs separated by blank lines
    const rawLines = raw.split(/\n/);
    const paragraphs = [];
    let buffer = [];
    rawLines.forEach(line => {
      if (line.trim() === '') {
        if (buffer.length) { paragraphs.push(buffer.join(' ')); buffer = []; }
        paragraphs.push(''); // marker for blank line
      } else {
        buffer.push(line.trim());
      }
    });
    if (buffer.length) paragraphs.push(buffer.join(' '));

    const justifyLine = (text, targetWidth) => {
      const words = text.trim().split(/\s+/);
      if (words.length < 2) return text; // can't justify
      // Initial width
      const measure = (t) => doc.getTextWidth(t) * (12 / doc.getFontSize());
      let base = words.join(' ');
      let w = measure(base);
      if (w >= targetWidth * 0.97) return base; // already close
      const gaps = words.length - 1;
      // Estimate additional spaces needed
      const spaceWidth = measure(' ');
      let extraSpaces = Math.max(0, Math.floor((targetWidth - w) / spaceWidth));
      if (!extraSpaces) return base;
      const basePerGap = Math.floor(extraSpaces / gaps);
      let remainder = extraSpaces % gaps;
      let out = '';
      words.forEach((word, i) => {
        out += word;
        if (i < gaps) {
          let count = 1 + basePerGap + (remainder > 0 ? 1 : 0);
          if (remainder > 0) remainder--;
          out += ' '.repeat(count);
        }
      });
      return out;
    };

    let cursorY = marginTop;
    const pageHeight = doc.internal.pageSize.getHeight();
    const bottomLimit = pageHeight - 72;

    paragraphs.forEach(para => {
      if (para === '') {
        // blank line
        cursorY += lineHeight;
        return;
      }
      // Wrap paragraph into lines
      const words = para.split(/\s+/);
      let lines = [];
      let current = '';
      words.forEach(word => {
        const test = current ? current + ' ' + word : word;
        const width = doc.getTextWidth(test) * (12 / doc.getFontSize());
        if (width > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      });
      if (current) lines.push(current);

      lines.forEach((line, idx) => {
        if (cursorY > bottomLimit) {
          doc.addPage();
          cursorY = marginTop;
        }
        let outLine = line;
        const isLast = idx === lines.length - 1;
        if (!isLast && line.length > 20) {
          outLine = justifyLine(line, maxWidth);
        }
        doc.text(outLine, marginX, cursorY);
        cursorY += lineHeight;
      });
      cursorY += lineHeight * 0.5; // paragraph spacing
    });

    // Closing footer (optional placeholder)
    if (cursorY + lineHeight * 2 < bottomLimit) {
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text('Generated by AI Cover Letter Generator', marginX, pageHeight - 40);
    }
    doc.save('cover-letter.pdf');
  };

  return (
  <main className="h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 flex flex-col items-center p-0 relative">
      <div className="w-full sticky top-0 z-20"><Header /></div>
  <section className="w-full h-[92%] flex flex-col md:flex-row gap-5 p-3 sm:p-8">
        {/* Form Section */}
  <div className="w-full md:w-[45%] h-[100%] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 border border-blue-100 flex flex-col justify-between hover:shadow-2xl transition-shadow">
          <form className="flex flex-col w-full h-full" onSubmit={handleGenerate}>
            <div className="w-full">
              <label htmlFor="resume" className="block text-base font-semibold leading-tight text-blue-900">Upload Resume (PDF) <span className="text-red-500" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <div className="mt-1">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept="application/pdf"
                  required
                  className={`w-full border rounded px-3 py-2 text-sm sm:text-base transition-all text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 cursor-pointer ${fileSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                  onChange={handleFileChange}
                />
              </div>
              {fileSelected && fileName && (
                <span className="block mt-1 text-sm font-semibold text-gray-900 break-words">{fileName}</span>
              )}
            </div>
            <div className="w-full flex-1 flex flex-col mt-2">
              <label htmlFor="jobDescription" className="block text-base font-semibold leading-tight text-blue-900">Job Description <span className="text-red-500" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                required
                className="w-full flex-1 mt-1 border rounded px-3 py-2 text-sm sm:text-base resize-none text-gray-900 placeholder-gray-500 min-h-[160px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 bg-white/70"
              />
            </div>
            <div className="mt-3">
              <button type="submit" disabled={loading || !resumeFile || !jobDescription.trim()} className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md hover:from-blue-500 hover:to-indigo-500 transition text-sm sm:text-base shadow flex items-center justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="btn-spinner" aria-hidden="true" />
                    <span>Generating...</span>
                  </span>
                ) : (
                  <span>Generate Cover Letter</span>
                )}
              </button>
              {!loading && (!resumeFile || !jobDescription.trim()) && (
                <p className="mt-1 text-[11px] text-slate-500">Select a PDF resume and paste the job description to enable generation.</p>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
          </form>
        </div>
        {/* Generated Cover Letter Section */}
        <div className="w-full md:w-[55%] h-[100%] bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 border border-emerald-100 flex flex-col hover:shadow-2xl transition-shadow">
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Cover Letter</h2>
              <span className="text-[10px] uppercase text-gray-400 font-medium">Editable</span>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded mb-2"></div>
            <textarea
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              placeholder="Your generated cover letter will appear here..."
              className="w-full flex-1 mt-1 border rounded px-3 py-3 text-sm sm:text-base leading-relaxed resize-none text-gray-900 font-serif min-h-[160px] focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 bg-white/70 text-justify"
            />
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <button onClick={handleDownloadPDF} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-2.5 rounded-md hover:from-emerald-500 hover:to-teal-500 transition text-sm sm:text-base shadow">Download PDF</button>
            <button onClick={() => setCoverLetter("")} className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 text-sm shadow">Clear</button>
          </div>
        </div>
      </section>
    </main>
  );
}

