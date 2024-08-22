import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { Item } from "@/types/item.type";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const DropdownComponent = ({ item }: { item: Item }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <Dropdown backdrop="blur" className="bg-popover">
        <DropdownTrigger>
          <button className="p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Static Actions">
          <DropdownItem key="edit" onClick={onOpen}>
            Edit item
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => setIsAlertOpen(true)}
          >
            Move to Trash
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <EditItem isOpen={isOpen} onOpenChange={onOpenChange} item={item} />

      <DeleteItem
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        item={item}
      />
    </>
  );
};

export default DropdownComponent;
