"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addItemsToDB } from "../../redux/slice/items.slice";
import { pushUndoStack } from "../../redux/slice/undo.slice";
import { clearRedoStack } from "../../redux/slice/redo.slice";
import { CirclePlus } from "lucide-react";

const AddNewItem = () => {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap"
        onClick={onOpen}
      >
        <CirclePlus /> New Item
      </button>
      <Modal
        className="bg-background"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Item
              </ModalHeader>
              <ModalBody>
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
                  <ModalFooter>
                    <Button
                      type="button"
                      color="primary"
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button type="submit" color="primary" variant="solid">
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewItem;
