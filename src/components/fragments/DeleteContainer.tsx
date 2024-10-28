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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteContainerToDB } from "@/redux/slice/container.slice";
import { deleteContainerTrashFromDB } from "@/redux/slice/trash.slice";
import { deleteContainerInitialMoney } from "@/redux/slice/initmoney.slice";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";

const DeleteContainerComponent = ({
  containerId,
  containerTitle,
  isOpen,
  setIsOpen,
}: {
  containerId: string;
  containerTitle: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteContainerToDB(containerId));
    dispatch(deleteContainerTrashFromDB(containerId));
    dispatch(deleteContainerInitialMoney(containerId));
    setIsOpen(false);
  };

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsOpen(true);
  };

  return (
    <AlertDialog open={isOpen}>
      <Button variant="destructive" size="sm" onClick={handleOpenModal}>
        Delete
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{containerTitle}</span> and remove from
            your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContainerComponent;
