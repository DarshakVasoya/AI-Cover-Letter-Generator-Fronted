"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      alert(`Uploaded: ${file.name}`);
      // TODO: Add API call to actually upload the file
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-12 bg-gradient-to-b from-blue-50 to-white">
      
      {/* Header Text */}
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
          Upload Your Application Documents
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Ensure your file includes all required documents and proof of payment.
          Only PDF or image formats are accepted.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-lg flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".pdf, image/*"
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={handleFileChange}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-2xl hover:bg-blue-700 transition-all duration-300"
        >
          Upload Document
        </button>
        {file && (
          <p className="mt-2 text-sm text-gray-500">Selected File: {file.name}</p>
        )}
      </div>

      {/* Footer Note */}
      <p className="text-sm text-gray-400 mt-6 max-w-md text-center">
        Your documents are securely uploaded. Make sure all required files are included.
      </p>
    </div>
  );
}

