import Logo from "./Logo";

// Responsive, flexible header: adjusts padding, layout, and font sizes per breakpoint
export default function Header() {
	return (
		<header className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 shadow-lg sticky top-0 z-30">
			<div className="flex flex-row items-center gap-3 sm:gap-4 w-full px-3 sm:px-6 py-2.5 sm:py-3 md:py-4">
				<Logo />
				<div className="flex flex-col min-w-0">
					<h1 className="text-white font-extrabold leading-tight whitespace-nowrap text-base sm:text-lg md:text-2xl xl:text-3xl">
						AI Cover Letter Generator
					</h1>
					<p className="text-white/90 text-[10px] sm:text-xs md:text-sm xl:text-base leading-snug hidden sm:block truncate">
						Generate tailored cover letters from your resume & job requirements.
					</p>
				</div>
			</div>
		</header>
	);
}
