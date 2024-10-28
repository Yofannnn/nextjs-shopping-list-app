import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { editContainerTitleToDB } from "@/redux/slice/container.slice";

const EditContainerComponent = ({
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
  const [inputTitle, setInputTitle] = useState("");
  const [inputInvalid, setInputInvalid] = useState(false);

  useEffect(() => {
    setInputTitle(containerTitle);
  }, [containerTitle]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onlySpacesPattern = /^\s*$/;

    if (!inputTitle || onlySpacesPattern.test(inputTitle)) {
      setInputInvalid(true);
      return;
    }

    if (inputTitle === containerTitle) {
      setIsOpen(false);
      return;
    }

    setInputInvalid(false);

    dispatch(editContainerTitleToDB({ containerId, newTitle: inputTitle }));

    setIsOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" size="sm" onClick={handleClick}>
        Edit
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Container</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 pb-6">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter new title"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              autoFocus
            />
            {inputInvalid && (
              <span className="text-destructive text-xs">
                Please enter a valid title
              </span>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContainerComponent;
