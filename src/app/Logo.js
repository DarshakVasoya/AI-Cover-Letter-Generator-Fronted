import Image from "next/image";
import logo from "../../public/ai-cover-letter-logo.svg";

export default function Logo() {
  return (
    <div className="flex items-center justify-center mb-2">
      <Image src={logo} alt="Logo" width={80} height={80} />
    </div>
  );
}
