import Link from "next/link";
import { useEffect, useState } from "react";
import { getListItems } from "@/indexedDB/item.indexedDB";
import { ChevronLeft, Search } from "lucide-react";
import PlaygroundMenuOptionComponent from "./PlaygroundMenuOption";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setSearchItem } from "@/redux/slice/search.slice";

const PlaygroundTopNavComponent = ({
  containerId,
}: {
  containerId: string;
}) => {
  const [titleContainer, setTitleContainer] = useState("");

  useEffect(() => {
    const fetchContainer = async () => {
      const res = await getListItems(containerId);
      res && setTitleContainer(res.title);
    };
    fetchContainer();

    document.title = titleContainer;
  });

  const dispatch: AppDispatch = useDispatch();
  const handleSearchItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value));
  };

  return (
    <nav className="fixed top-0 h-[65px] w-full flex justify-between items-center px-5 backdrop-blur bg-background[.2] z-50">
      <div className="flex justify-between items-center mr-2">
        <Link href="/create" className="p-2 rounded-full">
          <ChevronLeft className="size-6 md:size-7" />
        </Link>
        <h2 className="syne text-xl font-medium hidden md:block ml-3">
          {titleContainer}
        </h2>
      </div>
      <div className="relative md:ml-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[320px]"
          onChange={handleSearchItems}
        />
      </div>
      <PlaygroundMenuOptionComponent />
    </nav>
  );
};

export default PlaygroundTopNavComponent;
