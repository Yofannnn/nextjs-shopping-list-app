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
import { Item } from "@/types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteTrashFromDB } from "@/redux/slice/trash.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { addItemsToDB } from "@/redux/slice/items.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";

const RestoreComponent = ({
  itemTobeProcessed,
}: {
  itemTobeProcessed: Item;
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
    <>
      <Button color="primary" onClick={() => setIsAlertOpen(true)}>
        Restore
      </Button>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore {itemTobeProcessed.title} from trash
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
            <Button color="primary" onClick={handleClick}>
              Restore
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RestoreComponent;
