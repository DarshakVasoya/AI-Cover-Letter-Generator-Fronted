"use client";
import Logo from "./Logo";

export default function Header() {
	return (
				<header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
					<div className="w-full px-4 sm:px-6 py-2 flex flex-col gap-0.5">
						<div className="flex items-center gap-3 justify-start">
							<Logo size={40} />
							<h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent tracking-tight whitespace-nowrap">AI Cover Letter Generator</h1>
							<span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-medium text-slate-500 bg-slate-100/70 px-2 py-0.5 rounded hidden sm:inline-flex">Beta</span>
						</div>
					<p className="pl-[52px] text-xs sm:text-sm text-slate-500 tracking-wide hidden sm:block">Generate tailored cover letters from your resume & job requirements.</p>
					</div>
				</header>
	);
}
