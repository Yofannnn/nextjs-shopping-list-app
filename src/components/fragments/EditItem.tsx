import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalBody, ModalContent, ModalProvider } from "../ui/animated-modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Item } from "@/types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { editItemsToDB } from "@/redux/slice/items.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";

const EditItemComponent = ({
  isEditOpen,
  setIsEditOpen,
  item,
}: {
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  item: Item | null;
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
    if (!item) return;
    setInputTitle(item.title);
    setInputPrice(item.price);
  }, [item]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item) return;

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

    setIsEditOpen(false);
  };

  return (
    <ModalProvider open={isEditOpen} setOpen={setIsEditOpen}>
      <ModalBody className="max-w-[500px]">
        <ModalContent className="w-full p-4 md:p-8 overflow-y-auto flex flex-col">
          <h2 className="mb-2 text-xl font-semibold">Edit Item</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="my-3">
              <Label htmlFor="title-edit" className="inline-block mb-2">
                Title
              </Label>
              <Input
                type="text"
                id="title-edit"
                placeholder="Enter new title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                autoFocus
              />
              {inputInvalid && (
                <span className="text-destructive text-sm">
                  Please enter a valid title
                </span>
              )}
            </div>
            <div className="my-3">
              <Label htmlFor="price-edit" className="inline-block mb-2">
                Price
              </Label>
              <Input
                type="number"
                id="price-edit"
                placeholder="Enter new price"
                value={inputPrice.toString()}
                onChange={(e) => setInputPrice(Number(e.target.value))}
              />
              {inputInvalid && (
                <span className="text-destructive text-sm">
                  Please enter a valid price
                </span>
              )}
            </div>
            <div className="flex justify-end items-center gap-2 mt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </ModalContent>
      </ModalBody>
    </ModalProvider>
  );
};

export default EditItemComponent;
