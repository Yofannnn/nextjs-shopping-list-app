import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Item } from "../../types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { editItemsToDB } from "../../redux/slice/items.slice";
import { pushUndoStack } from "../../redux/slice/undo.slice";
import { clearRedoStack } from "../../redux/slice/redo.slice";

const EditItem = ({
  isOpen,
  onOpenChange,
  item,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  item: Item;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const { items } = useSelector((state: RootState) => state.items);
  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const [inputInvalid, setInputInvalid] = useState(false);

  useEffect(() => {
    setInputTitle(item.title);
    setInputPrice(item.price);
  }, [item.price, item.title]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onlySpacesPattern = /^\s*$/;

    if (!inputTitle || onlySpacesPattern.test(inputTitle)) {
      setInputInvalid(true);
      return;
    }

    setInputInvalid(false);

    const editedItem = {
      ...item,
      title: inputTitle,
      price: inputPrice,
      edit: true,
    };

    dispatch(pushUndoStack(items));

    dispatch(clearRedoStack());

    dispatch(
      editItemsToDB({
        containerId: slugContainerId,
        editedItem: editedItem,
      })
    );

    onOpenChange();
  };

  return (
    <>
      <Modal placement="top-center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit {item.title}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      variant="bordered"
                      label="Enter new title"
                      isInvalid={inputInvalid}
                      errorMessage="Please enter a valid title"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-6">
                    <Input
                      type="number"
                      variant="bordered"
                      label="Enter new price"
                      value={inputPrice.toString()}
                      onChange={(e) => setInputPrice(Number(e.target.value))}
                    />
                  </div>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="primary"
                      variant="bordered"
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

export default EditItem;
