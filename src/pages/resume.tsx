import React from "react";
import { useRouter } from "next/router";

const Resume = () => {
  const router = useRouter();

  const handleDownload = () => {
    // Trigger the download of the PDF
    window.open("/resume.pdf", "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 text-neutral-800 dark:text-white">
      <h1 className="text-3xl font-semibold mb-4">My Resume</h1>
      <iframe
        src="/resume.pdf"
        className="w-11/12 h-[70vh] border-2 dark:border-neutral-800"
        title="Resume"
      />
      <button
        onClick={handleDownload}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:outline-none"
      >
        Download Resume
      </button>
    </div>
  );
};

export default Resume;
