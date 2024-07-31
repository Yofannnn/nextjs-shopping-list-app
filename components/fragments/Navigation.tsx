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
        <Link href="/setting" className={btClassName("/setting")}>
          <Settings className="size-5 sm:size-6" />
        </Link>
      </nav>
    </>
  );
};

export default Navigation;
