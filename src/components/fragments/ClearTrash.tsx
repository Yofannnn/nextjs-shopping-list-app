import { useDispatch, useSelector } from "react-redux";
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
            <AlertDialogCancel
              variant="secondary"
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleClick}>
              Clear Trash
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClearTrashComponent;
