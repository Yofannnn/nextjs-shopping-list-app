"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setCurrencyToLocalStorage } from "@/redux/slice/currency.slice";
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

const FormatCurrencyComponent = ({ className }: { className: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className}>Format Currency</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Format Currency</DialogTitle>
          <DialogDescription>
            Select the currency format you want
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

export default FormatCurrencyComponent;

const ListboxComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([currency || "id-ID,IDR"])
  );

  const handleSelectionChange = (keys: Selection) => {
    const selected = new Set<string>(keys as Set<string>);
    setSelectedKeys(selected);
    const selectedCurrency = Array.from(selected).join(", ");
    dispatch(setCurrencyToLocalStorage(selectedCurrency));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
          aria-label="Single selection"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
        >
          <ListboxItem key="id-ID,IDR">IDR</ListboxItem>
          <ListboxItem key="en-US,USD">USD</ListboxItem>
          <ListboxItem key="de-DE,EUR">EUR</ListboxItem>
          <ListboxItem key="ja-JP,JPY">JPY</ListboxItem>
        </Listbox>
      </div>
    </div>
  );
};
