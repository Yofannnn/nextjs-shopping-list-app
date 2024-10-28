import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Item } from "@/types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteItemsFromDB } from "@/redux/slice/items.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";
import { addTrashToDB } from "@/redux/slice/trash.slice";
import { Dispatch, SetStateAction } from "react";

const DeleteItemComponent = ({
  isAlertOpen,
  setIsAlertOpen,
  item,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: Dispatch<SetStateAction<boolean>>;
  item: Item | null;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const { items } = useSelector((state: RootState) => state.items);

  const handleClick = () => {
    if (!item) return;

    dispatch(pushUndoStack(items));

    dispatch(clearRedoStack());

    dispatch(addTrashToDB({ containerId: slugContainerId, newTrash: item }));

    dispatch(
      deleteItemsFromDB({ containerId: slugContainerId, itemId: item.id })
    );

    setIsAlertOpen(false);
  };

  if (!item) return;

  return (
    <AlertDialog open={isAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>{item.title}</strong> will delete and move to trash
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemComponent;
