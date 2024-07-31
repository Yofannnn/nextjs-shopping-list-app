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
import { loadSort, setSortToLocalStorage } from "../../redux/slice/sort.slice";
import { Selection } from "@react-types/shared";

const SortItemsComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch(loadSort());
  });

  return (
    <>
      <button
        className="w-full pl-4 text-start py-4 text-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
        onClick={onOpen}
      >
        Sort State
      </button>
      <Modal
        size="xs"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sort By</ModalHeader>
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

export default SortItemsComponent;

const ListboxComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sort } = useSelector((state: RootState) => state.sort);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([sort])
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
