"use client";

import {
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  loadCurrency,
  setCurrencyToLocalStorage,
} from "../../redux/slice/currency.slice";
import { Selection } from "@react-types/shared";

const FormatCurrencyComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch(loadCurrency());
  }, [dispatch]);

  return (
    <>
      <button
        className="w-full pl-4 text-start py-4 text-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
        onClick={onOpen}
      >
        Format Currency
      </button>
      <Modal
        size="xs"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-background"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select format currency
              </ModalHeader>
              <ModalBody>
                <ListboxComponent />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormatCurrencyComponent;

const ListboxComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([currency])
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
