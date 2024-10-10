import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { editInitialMoney } from "@/redux/slice/initmoney.slice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const StartingBudgetComponent = ({ className }: { className: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const { initialMoney } = useSelector(
    (state: RootState) => state.initialMoney
  );
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const [inputInitialMoney, setInputInitialMoney] = useState(0);

  useEffect(() => {
    const filteredInitMoney = initialMoney.find(
      (item) => item.containerId === slugContainerId
    )?.initialMoney;
    if (filteredInitMoney !== undefined) {
      setInputInitialMoney(filteredInitMoney);
    }
  }, [initialMoney, slugContainerId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputInitialMoney <= 0) return;
    dispatch(
      editInitialMoney({
        containerId: slugContainerId,
        newInitialMoney: inputInitialMoney,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className}>Set Starting Budget</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Starting Budget</DialogTitle>
          <DialogDescription>
            Set your starting budget right here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-6">
            <Input
              type="number"
              variant="bordered"
              color="primary"
              label="Enter Starting Budget"
              value={inputInitialMoney.toString()}
              onChange={(e) => setInputInitialMoney(Number(e.target.value))}
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" variant="default">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StartingBudgetComponent;
