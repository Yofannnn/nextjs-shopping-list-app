import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "@nextui-org/react";
import { AppDispatch, RootState } from "@/redux/store";
import { clearTrashFromDB } from "@/redux/slice/trash.slice";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { clearRedoStack } from "@/redux/slice/redo.slice";
import { addItemsToDB } from "@/redux/slice/items.slice";

const RestoreAllComponent = ({
  isAlertOpen,
  setIsAlertOpen,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (arg0: boolean) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.items);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const { containersTrash } = useSelector((state: RootState) => state.trash);
  const trashes = containersTrash.find(
    (container) => container.id === slugContainerId
  )?.items;

  const handleClick = async () => {
    dispatch(pushUndoStack(items));

    if (!trashes) return;

    for (const trash of trashes) {
      const index = items.findIndex((item) => item.id === trash.id);
      if (index === -1)
        await dispatch(
          addItemsToDB({ containerId: slugContainerId, newItem: trash })
        );
    }

    dispatch(clearTrashFromDB(slugContainerId));
    dispatch(clearRedoStack());
  };

  return (
    <>
      <AlertDialog open={isAlertOpen ? true : false}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will restore all item from trash
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
              Restore All
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RestoreAllComponent;
