import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const ExpenseOverviewComponent = ({ className }: { className: string }) => {
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className={className}>
          <Wallet />
          Expense
        </button>
      </DrawerTrigger>
      <DrawerContent className="outline-0 outline-transparent">
        <DrawerHeader>
          <DrawerTitle className="mx-auto w-[90vw] md:w-[50vw] syne text-lg md:text-xl lg:text-2xl">
            Expense Overview
          </DrawerTitle>
          <DrawerDescription className="mx-auto w-[90vw] md:w-[50vw] text-xs md:text-sm lg:text-base">
            Tracks the total cost of all items in the shopping list at here.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-x-hidden overflow-y-auto py-2">
          <div className="mx-auto mb-5 w-[90vw] md:w-[50vw] max-h-[65vh] grid gap-4 text-sm md:text-base lg:text-lg poppins">
            <h6>Total Cost of Your Shopping : {formatter.format(totalAll)}</h6>{" "}
            <h6>Starting Budget : {formatter.format(filteredInitMoney)}</h6>{" "}
            <h6>Total Checked Items : {formatter.format(totalChecked)} </h6>
            <h6>Remaining Balance : {formatter.format(remainMoney)}</h6>{" "}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpenseOverviewComponent;
