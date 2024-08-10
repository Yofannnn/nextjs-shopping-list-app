import Link from "next/link";
import { useEffect, useState } from "react";
import { getListItems } from "../../indexedDB/item.indexedDB";
import { Skeleton } from "@nextui-org/skeleton";
import { ChevronLeft } from "lucide-react";

const TopBarComponent = ({ containerId }: { containerId: string }) => {
  const [titleContainer, setTitleContainer] = useState("");

  useEffect(() => {
    const fetchContainer = async () => {
      const res = await getListItems(containerId);
      res && setTitleContainer(res.title);
    };
    fetchContainer();

    document.title = titleContainer;
  });

  return (
    <>
      <div className="fixed top-0 h-[65px] w-full flex items-center px-5 backdrop-blur bg-background[.2] z-50">
        <Link href="/create">
          <ChevronLeft className="size-7" />
        </Link>
        {titleContainer ? (
          <h2 className="ml-3">{titleContainer}</h2>
        ) : (
          <Skeleton className="h-5 w-2/12 rounded-lg ml-3" />
        )}
      </div>
    </>
  );
};

export default TopBarComponent;
