import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { pushUndoStack } from "../../redux/slice/undo.slice";
import { clearRedoStack } from "../../redux/slice/redo.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { clearItemsFromDb } from "../../redux/slice/items.slice";
import { addTrashToDB } from "../../redux/slice/trash.slice";
import { CircleX } from "lucide-react";

const ClearItemsComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { items } = useSelector((state: RootState) => state.items);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );

  const handleClick = async () => {
    if (items.length === 0) return;

    for (const item of items) {
      await dispatch(
        addTrashToDB({ containerId: slugContainerId, newTrash: item })
      );
    }

    dispatch(pushUndoStack(items));

    dispatch(clearRedoStack());

    dispatch(clearItemsFromDb(slugContainerId));

    setIsAlertOpen(false);
  };

  return (
    <>
      <button
        className={`${
          items.length !== 0 ? "opacity-100" : "opacity-50"
        } flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap`}
        disabled={items.length === 0}
        onClick={() => setIsAlertOpen(true)}
      >
        <CircleX />
        Clear Items
      </button>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all items and move to trash.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button color="primary" onClick={() => setIsAlertOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleClick}>
              Clear Items
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClearItemsComponent;
