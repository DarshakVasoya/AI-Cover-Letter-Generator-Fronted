"use client";
import Logo from "./Logo";

export default function LoadingOverlay({ show, message = "Generating" }) {
  if (!show) return null;
  return (
    <div className="absolute inset-x-0 -top-3 flex justify-center pointer-events-none select-none">
      <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 shadow">
        <div className="relative">
          <Logo size={28} />
          <span className="logo-spinner-overlay" />
        </div>
        <span className="text-xs font-medium text-slate-700 tracking-wide flex items-center gap-1">
          {message}
          <span className="loading-dots inline-flex w-4 justify-start overflow-hidden">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </span>
      </div>
    </div>
  );
}
