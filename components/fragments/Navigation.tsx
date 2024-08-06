import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Pen, Settings } from "lucide-react";

const Navigation = () => {
  const pathName = usePathname();

  const btClassName = (path: string) => {
    return `${
      pathName === path
        ? "text-white bg-black dark:text-black dark:bg-white"
        : ""
    } p-2 rounded-full inline-block`;
  };

  return (
    <>
      <nav className="fixed bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4 px-4 py-2 sm:py-3 rounded-full backdrop-blur bg-black/[.1] dark:bg-white/[.1]">
        <Link href="/" className={btClassName("/")}>
          <House className="size-5 sm:size-6" />
        </Link>
        <Link href="/create" className={btClassName("/create")}>
          <Pen className="size-5 sm:size-6" />
        </Link>
        <Link href="/ai" className="p-2 rounded-full inline-block">
          <GeminiAiSVG />
        </Link>
        <Link href="/setting" className={btClassName("/setting")}>
          <Settings className="size-5 sm:size-6" />
        </Link>
      </nav>
    </>
  );
};

export default Navigation;

const GeminiAiSVG = () => {
  return (
    <>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5 sm:size-6"
      >
        <path
          d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z"
          fill="url(#paint0_radial_16771_53212)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_16771_53212"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(2.77876 11.3795) rotate(18.6832) scale(29.8025 238.737)"
          >
            <stop offset="0.0671246" stop-color="#9168C0" />
            <stop offset="0.342551" stop-color="#5684D1" />
            <stop offset="0.672076" stop-color="#1BA1E3" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
};
