"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "@/types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addItemsToDB } from "@/redux/slice/items.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";
import { CirclePlus } from "lucide-react";

const AddNewItem = ({ className }: { className: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const { items } = useSelector((state: RootState) => state.items);
  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const [inputInvalid, setInputInvalid] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onlySpacesPattern = /^\s*$/;

    if (!inputTitle || onlySpacesPattern.test(inputTitle)) {
      setInputInvalid(true);
      return;
    }

    setInputInvalid(false);

    const id = uuidv4();
    const title = inputTitle;
    const price = inputPrice;
    const checked = false;
    const createdAt = new Date().getTime();
    const newItem: Item = {
      id,
      title,
      price,
      checked,
      createdAt,
      edit: false,
    };

    dispatch(pushUndoStack(items));

    dispatch(clearRedoStack());

    dispatch(
      addItemsToDB({
        containerId: slugContainerId,
        newItem,
      })
    );

    setInputTitle("");
    setInputPrice(0);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={className}>
          <CirclePlus /> Add Item
        </button>
      </SheetTrigger>
      <SheetContent side="top" className="flex justify-center items-center">
        <div className="w-[520px]">
          <SheetHeader className="self-start">
            <SheetTitle>Add New Item</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                variant="bordered"
                label="Enter new items"
                color="primary"
                isInvalid={inputInvalid}
                errorMessage="Please enter a valid title"
                onChange={(e) => setInputTitle(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-6">
              <Input
                type="number"
                color="primary"
                variant="bordered"
                label="Enter the price"
                onChange={(e) => setInputPrice(Number(e.target.value))}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="my-2 sm:my-0"
                >
                  close
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button type="submit">Save</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddNewItem;
