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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteContainerToDB } from "@/redux/slice/container.slice";
import { deleteContainerTrashFromDB } from "@/redux/slice/trash.slice";
import { deleteContainerInitialMoney } from "@/redux/slice/initmoney.slice";

const DeleteContainerComponent = ({
  containerId,
  containerTitle,
  handleButtonClick,
}: {
  containerId: string;
  containerTitle: string;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    dispatch(deleteContainerToDB(containerId));
    dispatch(deleteContainerTrashFromDB(containerId));
    dispatch(deleteContainerInitialMoney(containerId));
    setIsAlertOpen(false);
  };

  return (
    <>
      <button
        className="text-danger"
        onClick={(e) => {
          setIsAlertOpen(true);
          handleButtonClick(e);
        }}
      >
        Delete
      </button>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-bold">{containerTitle}</span> and remove from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button color="primary" onClick={() => setIsAlertOpen(false)}>
              Cancle
            </Button>
            <Button color="danger" onClick={handleClick}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteContainerComponent;
