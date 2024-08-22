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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Selection } from "@react-types/shared";
import { setColorThemeToLocalStorage } from "@/redux/slice/color.slice";

const ColorThemeComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        className="w-full pl-4 text-start py-4 text-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
        onClick={onOpen}
      >
        Color Theme
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
                Choose the color you want
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

export default ColorThemeComponent;

const ListboxComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { colorTheme } = useSelector((state: RootState) => state.colorTheme);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set([colorTheme])
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
