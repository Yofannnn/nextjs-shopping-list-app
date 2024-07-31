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
import { useTheme } from "next-themes";
import { Selection } from "@react-types/shared";

const ThemeSelectorComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="w-full pl-4 text-start py-4 text-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
        onClick={onOpen}
      >
        Themes
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
              <ModalHeader className="flex flex-col gap-1">
                Select Theme
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
