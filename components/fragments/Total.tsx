import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Scroll } from "lucide-react";
import { formatCurrency } from "../../utils/format-currency";

const TotalComponent = () => {
  const { items } = useSelector((state: RootState) => state.items);
  const { currency } = useSelector((state: RootState) => state.currency);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );

  let [locale, currencyCode] = currency.split(",");
  if (currency == "") {
    locale = "id-ID";
    currencyCode = "IDR";
  }
  const formatter = formatCurrency(locale, currencyCode);

  const filteredInitMoney =
    useSelector((state: RootState) => state.initialMoney).initialMoney.find(
      (item) => item.containerId === slugContainerId
    )?.initialMoney || 0;

  const totalChecked = items
    .filter((item) => item.checked === true)
    .map((item) => item.price)
    .reduce((acc, cur) => acc + cur, 0);

  const totalAll = items
    .map((item) => item.price)
    .reduce((acc, cur) => acc + cur, 0);

  const remainMoney = filteredInitMoney - totalChecked;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap"
        onClick={onOpen}
      >
        <Scroll />
        Total
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Total</ModalHeader>
              <ModalBody>
                <div className="p-5">
                  <h4>total price all items : {formatter.format(totalAll)}</h4>
                  <h4>initial money : {formatter.format(filteredInitMoney)}</h4>
                  <h4>
                    total item has been checked :{" "}
                    {formatter.format(totalChecked)}
                  </h4>
                  <h4>remain: {formatter.format(remainMoney)}</h4>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TotalComponent;
