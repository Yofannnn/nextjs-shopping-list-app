"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Item } from "../../types/item.type";
import CardItem from "./CardItems";
import Image from "next/image";

const WrapperListItems = () => {
  const { items } = useSelector((state: RootState) => state.items);
  const { sort } = useSelector((state: RootState) => state.sort);

  let sortedItems: Item[] = [];

  if (!sort || sort === "time")
    sortedItems = items.slice().sort((a, b) => a.createdAt - b.createdAt);
  if (sort === "name")
    sortedItems = items.slice().sort((a, b) => +a.title - +b.title);
  if (sort === "checked")
    sortedItems = items.slice().sort((a, b) => +a.checked - +b.checked);

  return (
    <>
      <div className="w-full md:w-4/5 p-2 md:py-1 md:px-2">
        <div className="mx-auto mt-[65px] mb-[70px] sm:mb-0">
          {sortedItems.length > 0 ? (
            sortedItems.map((item, i) => <CardItem key={i} item={item} />)
          ) : (
            <EmptyListItems />
          )}
        </div>
      </div>
    </>
  );
};

export default WrapperListItems;

const EmptyListItems = () => {
  return (
    <>
      <div className="flex flex-col items-center text-2xl w-full flex justify-center items-center h-calc-screen-minus-160 sm:h-calc-screen-minus-80">
        <Image
          src="/Work-illustrations-by-Storyset.svg"
          height={500}
          width={500}
          alt="svg"
          className="w-3/5 sm:w-1/3"
          priority
        />
        List Item is Empty
      </div>
    </>
  );
};
