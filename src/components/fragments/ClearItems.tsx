import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { clearItemsFromDb } from "@/redux/slice/items.slice";
import { addTrashToDB } from "@/redux/slice/trash.slice";
import { cn } from "@/lib/utils";

const ClearItemsComponent = ({ className }: { className: string }) => {
  const dispatch: AppDispatch = useDispatch();
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
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            className,
            items.length !== 0 ? "opacity-100" : "opacity-50"
          )}
          disabled={items.length === 0}
        >
          Clear Items
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete all items and move to trash.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleClick}>
            Clear Items
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearItemsComponent;
