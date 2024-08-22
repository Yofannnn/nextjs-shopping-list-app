import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { editInitialMoney } from "@/redux/slice/initmoney.slice";
import { HandCoins } from "lucide-react";

const InitialMoneyComponent = () => {
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
    onOpenChange();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap"
        onClick={onOpen}
      >
        <HandCoins />
        Initial Money
      </button>
      <Modal
        className="bg-background"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Set Initial Money
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-6">
                    <Input
                      type="number"
                      variant="bordered"
                      color="primary"
                      label="Enter Initial Money"
                      value={inputInitialMoney.toString()}
                      onChange={(e) =>
                        setInputInitialMoney(Number(e.target.value))
                      }
                      autoFocus
                    />
                  </div>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="primary"
                      variant="bordered"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button type="submit" color="primary" variant="solid">
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InitialMoneyComponent;
