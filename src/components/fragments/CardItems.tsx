import CheckboxItem from "@/components/elements/Checkbox";
import { Item } from "@/types/item.type";
import { formatCurrency } from "@/lib/format-currency";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Dispatch, SetStateAction } from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

const CardItem = ({
  item,
  setIsEditOpen,
  setIsAlertOpen,
  setEditOrMoveItem,
}: {
  item: Item;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setIsAlertOpen: Dispatch<SetStateAction<boolean>>;
  setEditOrMoveItem: Dispatch<SetStateAction<Item | null>>;
}) => {
  const { currency } = useSelector((state: RootState) => state.currency);
  let [locale, currencyCode] = currency.split(",");
  if (currency == "") {
    locale = "id-ID";
    currencyCode = "IDR";
  }
  const formatter = formatCurrency(locale, currencyCode);

  return (
    <Card className="my-2 bg-card">
      <div className="flex justify-between items-center gap-3 md:gap-4 px-3 md:px-5 py-2 md:py-3">
        <CheckboxItem item={item} />
        <div className="w-full">
          <h5 className="text-xs md:text-base lg:text-lg flex justify-start items-center">
            {item.title}
          </h5>
          <h6 className="text-[10px] md:text-base">
            {item.price ? formatter.format(item.price) : null}
          </h6>
        </div>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              size="icon"
              variant="outline"
              className="p-1 md:p-2 rounded-full"
            >
              <EllipsisVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="edit"
              onClick={() => {
                setIsEditOpen(true);
                setEditOrMoveItem(item);
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => {
                setIsAlertOpen(true);
                setEditOrMoveItem(item);
              }}
            >
              Move to Trash
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Card>
  );
};

export default CardItem;
