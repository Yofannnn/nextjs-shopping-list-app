import RestoreComponent from "./Restore";
import { Item } from "@/types/item.type";
import { Card, CardBody, Chip } from "@nextui-org/react";
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
        <CardBody>
          <div className="flex justify-between items-center gap-3 md:gap-4 py-1 md:py-2">
            <div className="w-full">
              <h1 className="text-xl flex justify-start items-center gap-2">
                {trash.title}
                {trash.edit ? (
                  <Chip
                    variant="shadow"
                    size="sm"
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    edited
                  </Chip>
                ) : null}
              </h1>
              <h4 className="text-base">{formatter.format(trash.price)}</h4>
            </div>
            <RestoreComponent itemTobeProcessed={trash} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CardTrashComponent;
