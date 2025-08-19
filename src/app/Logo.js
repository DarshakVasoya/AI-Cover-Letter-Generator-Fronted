"use client";

export default function Logo({ size = 40, className = "" }) {
	const s = size;
	return (
		<div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: s, height: s }}>
			<svg
				width={s}
				height={s}
				viewBox="0 0 64 64"
				fill="none"
				className="drop-shadow-sm"
				aria-hidden="true"
			>
				<defs>
					<linearGradient id="lg-a" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
						<stop offset="0%" stopColor="#2563eb" />
						<stop offset="60%" stopColor="#6366f1" />
						<stop offset="100%" stopColor="#0d9488" />
					</linearGradient>
				</defs>
				<circle cx="32" cy="32" r="28" stroke="url(#lg-a)" strokeWidth="4" className="logo-ring" />
				<path
					d="M18 40c8 2 14-4 14-12V16l14 8v6c0 12-10 22-22 22-4 0-8-1-11-3"
					stroke="url(#lg-a)"
					strokeWidth="4"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="logo-path"
				/>
				<circle cx="32" cy="32" r="6" fill="url(#lg-a)" className="logo-core" />
			</svg>
			<span className="sr-only">AI Cover Letter Generator</span>
		</div>
	);
}
