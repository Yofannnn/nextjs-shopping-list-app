import CheckboxItem from "../elements/Checkbox";
import DropdownComponent from "./Dropdown";
import { Card, CardBody } from "@nextui-org/react";
import { Item } from "@/types/item.type";
import { formatCurrency } from "@/lib/format-currency";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CardItem = ({ item }: { item: Item }) => {
  const { currency } = useSelector((state: RootState) => state.currency);
  let [locale, currencyCode] = currency.split(",");
  if (currency == "") {
    locale = "id-ID";
    currencyCode = "IDR";
  }
  const formatter = formatCurrency(locale, currencyCode);

  return (
    <Card className="my-2 bg-card">
      <CardBody>
        <div className="flex justify-between items-center gap-3 md:gap-4 py-1 md:py-2">
          <CheckboxItem item={item} />
          <div className="w-full">
            <h1 className="text-xl flex justify-start items-center">
              {item.title}
            </h1>
            <h4 className="text-base">
              {item.price ? formatter.format(item.price) : null}
            </h4>
          </div>
          <DropdownComponent item={item} />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItem;
