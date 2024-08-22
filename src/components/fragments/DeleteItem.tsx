import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "@nextui-org/react";
import { Item } from "@/types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteItemsFromDB } from "@/redux/slice/items.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";
import { addTrashToDB } from "@/redux/slice/trash.slice";

export default function DeleteItem({
  isAlertOpen,
  setIsAlertOpen,
  item,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (arg0: boolean) => void;
  item: Item;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const { items } = useSelector((state: RootState) => state.items);

  const handleClick = () => {
    dispatch(pushUndoStack(items));

    dispatch(clearRedoStack());

    dispatch(addTrashToDB({ containerId: slugContainerId, newTrash: item }));

    dispatch(
      deleteItemsFromDB({ containerId: slugContainerId, itemId: item.id })
    );
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
          <AlertDialogDescription>
            The {item.title} will delete and move to trash
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            color="primary"
            variant="bordered"
            onClick={() => setIsAlertOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => {
              setIsAlertOpen(false);
              handleClick();
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
