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

const ClearTrashComponent = ({
  isAlertOpen,
  setIsAlertOpen,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (arg0: boolean) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );

  const handleClick = () => {
    dispatch(clearTrashFromDB(slugContainerId));
    setIsAlertOpen(false);
  };

  return (
    <>
      <AlertDialog open={isAlertOpen ? true : false}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete all of items from your storage? You can&apos;t
              reverse this action
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button color="primary" onClick={() => setIsAlertOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleClick}>
              Clear Trash
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClearTrashComponent;
