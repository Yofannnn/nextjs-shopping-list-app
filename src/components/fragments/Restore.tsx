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
import { Button } from "@/components/ui/button";
import { Item } from "@/types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteTrashFromDB } from "@/redux/slice/trash.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { addItemsToDB } from "@/redux/slice/items.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";
import { RefreshCcw } from "lucide-react";

const RestoreComponent = ({
  itemTobeProcessed,
}: {
  itemTobeProcessed: Item;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.items);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );

  const handleClick = () => {
    const index = items.findIndex((item) => item.id === itemTobeProcessed.id);
    if (index === -1) {
      dispatch(pushUndoStack(items));

      dispatch(
        addItemsToDB({
          containerId: slugContainerId,
          newItem: itemTobeProcessed,
        })
      );

      dispatch(
        deleteTrashFromDB({
          containerId: slugContainerId,
          itemId: itemTobeProcessed.id,
        })
      );

      dispatch(clearRedoStack());
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" color="primary" className="text-xs md:text-base">
          <RefreshCcw className="size-3 md:size-4 mr-1" /> Restore
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will restore {itemTobeProcessed.title} from trash
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Restore</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestoreComponent;
