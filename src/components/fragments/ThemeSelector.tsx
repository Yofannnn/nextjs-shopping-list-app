"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Selection } from "@react-types/shared";
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

const ThemeSelectorComponent = ({ className }: { className: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className}>Themes</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Theme</DialogTitle>
          <DialogDescription>Select your preference theme</DialogDescription>
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

export default ThemeSelectorComponent;

const ListboxComponent = () => {
  const { theme, setTheme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([`${theme}`])
  );

  const handleSelectionChange = (keys: Selection) => {
    const selected = new Set<string>(keys as Set<string>);
    setSelectedKeys(selected);
    const selectedTheme = Array.from(selected).join(", ");
    setTheme(selectedTheme);
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
          <ListboxItem key="dark">Dark</ListboxItem>
          <ListboxItem key="light">Light</ListboxItem>
        </Listbox>
      </div>
    </div>
  );
};
