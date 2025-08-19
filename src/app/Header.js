import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full h-16 sm:h-20 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 flex items-center shadow-lg mb-2">
      <div className="flex items-center w-full px-2 sm:px-6">
        <Logo />
        <div className="ml-4 text-left">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg mb-1">AI Cover Letter Generator</h1>
          <p className="text-xs sm:text-sm text-white/90">Generate a professional cover letter instantly by uploading your resume and entering job requirements. Powered by AI for tailored results.</p>
        </div>
      </div>
    </header>
  );
}
