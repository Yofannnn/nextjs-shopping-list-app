import RestoreComponent from "./Restore";
import { Item } from "@/types/item.type";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatCurrency } from "@/lib/format-currency";

const CardTrashComponent = ({ trash }: { trash: Item }) => {
  const { currency } = useSelector((state: RootState) => state.currency);
  let [locale, currencyCode] = currency.split(",");
  if (currency == "") {
    locale = "id-ID";
    currencyCode = "IDR";
  }
  const formatter = formatCurrency(locale, currencyCode);

  return (
    <>
      <Card className="w-full my-2 bg-card">
        <div className="flex justify-between items-center gap-3 md:gap-4 px-2 md:px-4 py-1.5 md:py-2 overflow-hidden">
          <div className="max-w-[80%]">
            <h5 className="text-sm md:text-base lg:text-lg flex justify-start items-center gap-2">
              {trash.title}
            </h5>
            <h6 className="text-xs md:text-base">
              {formatter.format(trash.price)}
            </h6>
            {trash.edit ? <Badge>edited</Badge> : null}
          </div>
          <RestoreComponent itemTobeProcessed={trash} />
        </div>
      </Card>
    </>
  );
};

export default CardTrashComponent;
