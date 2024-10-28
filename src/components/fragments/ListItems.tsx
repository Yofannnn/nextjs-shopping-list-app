"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Item } from "@/types/item.type";
import CardItem from "./CardItems";
import EditItemComponent from "./EditItem";
import DeleteItemComponent from "./DeleteItem";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const WrapperListItems = () => {
  const { items } = useSelector((state: RootState) => state.items);
  const { sort } = useSelector((state: RootState) => state.sort);

  const [parent] = useAutoAnimate();

  let sortedItems: Item[] = [];

  if (!sort || sort === "time")
    sortedItems = items.slice().sort((a, b) => a.createdAt - b.createdAt);
  if (sort === "name")
    sortedItems = items.slice().sort((a, b) => +a.title - +b.title);
  if (sort === "checked")
    sortedItems = items.slice().sort((a, b) => +a.checked - +b.checked);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editOrMoveItem, setEditOrMoveItem] = useState<Item | null>(null);

  return (
    <>
      <div className="w-full md:w-4/5 p-2 md:py-1 md:px-2">
        <div ref={parent} className="mx-auto mt-[65px] mb-[70px] sm:mb-0">
          {sortedItems.length > 0 ? (
            sortedItems.map((item, i) => (
              <CardItem
                key={i}
                item={item}
                setIsEditOpen={setIsEditOpen}
                setIsAlertOpen={setIsAlertOpen}
                setEditOrMoveItem={setEditOrMoveItem}
              />
            ))
          ) : (
            <EmptyListItems />
          )}
        </div>
        <EditItemComponent
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          item={editOrMoveItem}
        />
        <DeleteItemComponent
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          item={editOrMoveItem}
        />
      </div>
    </>
  );
};

export default WrapperListItems;

const EmptyListItems = () => {
  return (
    <>
      <div className="flex flex-col items-center text-2xl w-full justify-center h-calc-screen-minus-160 sm:h-calc-screen-minus-80">
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
