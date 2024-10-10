"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Selection } from "@react-types/shared";
import { setColorThemeToLocalStorage } from "@/redux/slice/color.slice";
import { Button } from "@/components/ui/button";
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

const ColorThemeComponent = ({ className }: { className: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className}>Color Preference</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Color Preference</DialogTitle>
          <DialogDescription>
            Select color preference what you want
          </DialogDescription>
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

export default ColorThemeComponent;

const ListboxComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { colorTheme } = useSelector((state: RootState) => state.colorTheme);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([colorTheme || "default"])
  );

  const handleSelectionChange = (keys: Selection) => {
    const selected = new Set<string>(keys as Set<string>);
    setSelectedKeys(selected);
    const selectedSort = Array.from(selected).join(", ");
    dispatch(setColorThemeToLocalStorage(selectedSort));
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
          <ListboxItem key="default">Default</ListboxItem>
          <ListboxItem key="green">Green</ListboxItem>
          <ListboxItem key="orange">Orange</ListboxItem>
          <ListboxItem key="yellow">Yellow</ListboxItem>
          <ListboxItem key="violet">Violet</ListboxItem>
          <ListboxItem key="blue">Blue</ListboxItem>
        </Listbox>
      </div>
    </div>
  );
};
