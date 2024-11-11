"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Item } from "@/types/item.type";
import CardItem from "./CardItems";
import EditItemComponent from "./EditItem";
import DeleteItemComponent from "./DeleteItem";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const WrapperListItems = () => {
  const [parent] = useAutoAnimate();
  const { items } = useSelector((state: RootState) => state.items);
  const { sort } = useSelector((state: RootState) => state.sort);
  const searchKeywords = useSelector((state: RootState) => state.searchItem.searchItem);
  const [sortedItems, setSortedItems] = useState<Item[] | []>([]);
  const [renderItems, setRenderItems] = useState<Item[] | []>([]);

  useEffect(() => {
    let sortedArray: Item[] = [];

    if (!sort || sort === "time") {
      sortedArray = items.slice().sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "name") {
      sortedArray = items
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "checked") {
      sortedArray = items
        .slice()
        .sort((a, b) => Number(a.checked) - Number(b.checked));
    }

    setSortedItems(sortedArray);
  }, [items, sort]);

  useEffect(() => {
    if (!searchKeywords) setRenderItems([...sortedItems]);
    if (searchKeywords)
      setRenderItems(
        [...sortedItems].filter((item) =>
          item.title.toLowerCase().includes(searchKeywords.toLowerCase())
        )
      );
  }, [searchKeywords, sortedItems]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editOrMoveItem, setEditOrMoveItem] = useState<Item | null>(null);

  return (
    <>
      <div className="w-full md:w-4/5 p-2 md:py-1 md:px-2">
        <div ref={parent} className="mx-auto mt-[65px] mb-[70px] sm:mb-0">
          {sortedItems.length > 0 ? (
            renderItems.length > 0 ? (
              renderItems.map((item, i) => (
                <CardItem
                  key={i}
                  item={item}
                  setIsEditOpen={setIsEditOpen}
                  setIsAlertOpen={setIsAlertOpen}
                  setEditOrMoveItem={setEditOrMoveItem}
                />
              ))
            ) : (
              <EmptySearchItems />
            )
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

const EmptySearchItems = () => {
  return (
    <div className="flex flex-col items-center text-2xl w-full justify-center h-calc-screen-minus-160 sm:h-calc-screen-minus-80">
      No Result Found
    </div>
  );
};
