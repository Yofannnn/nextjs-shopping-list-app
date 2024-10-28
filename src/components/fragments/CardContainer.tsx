import { useState } from "react";
import { Container } from "@/types/container.type";
import EditContainerComponent from "./EditContainer";
import DeleteContainerComponent from "./DeleteContainer";
import Link from "next/link";

const CardContainerComponent = ({ container }: { container: Container }) => {
  const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);

  const prevent = (e: React.MouseEvent<HTMLAnchorElement>) =>
    (isDialogEditOpen || isDialogDeleteOpen) && e.preventDefault();

  return (
    <Link
      href={`/create/${container.id}`}
      className="flex justify-between p-2 md:p-3 hover:bg-background rounded-2xl border"
      onClick={prevent}
    >
      <div>
        <h2 className="text-sm md:text-lg">{container.title}</h2>
        <h6 className="text-xs md:text-base">
          {`${container.items.length} ${
            container.items.length > 1 ? "products" : "product"
          }`}
        </h6>
      </div>
      <div className="flex justify-center items-center gap-2">
        <EditContainerComponent
          containerId={container.id}
          containerTitle={container.title}
          isOpen={isDialogEditOpen}
          setIsOpen={setIsDialogEditOpen}
        />
        <DeleteContainerComponent
          containerId={container.id}
          containerTitle={container.title}
          isOpen={isDialogDeleteOpen}
          setIsOpen={setIsDialogDeleteOpen}
        />
      </div>
    </Link>
  );
};
export default CardContainerComponent;
