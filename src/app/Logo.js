import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/ai-cover-letter-logo.svg"
        alt="AI Cover Letter Logo"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-md select-none"
        priority
      />
    </div>
  );
}