"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setSortToLocalStorage } from "@/redux/slice/sort.slice";
import { Selection } from "@react-types/shared";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const SortItemsComponent = ({ className }: { className: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className}>Sort List</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sort By</DialogTitle>
        </DialogHeader>
        <ListboxComponent />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SortItemsComponent;

const ListboxComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sort } = useSelector((state: RootState) => state.sort);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([sort || "time"])
  );

  const handleSelectionChange = (keys: Selection) => {
    const selected = new Set<string>(keys as Set<string>);
    setSelectedKeys(selected);
    const selectedSort = Array.from(selected).join(", ");
    dispatch(setSortToLocalStorage(selectedSort));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
          aria-label="Single selection"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
        >
          <ListboxItem key="time">Time</ListboxItem>
          <ListboxItem key="name">Name</ListboxItem>
          <ListboxItem key="checked">Checked</ListboxItem>
        </Listbox>
      </div>
    </div>
  );
};
