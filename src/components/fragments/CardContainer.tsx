import { Container } from "@/types/container.type";
import EditContainerComponent from "./EditContainer";
import DeleteContainerComponent from "./DeleteContainer";
import Link from "next/link";

const CardContainerComponent = ({ container }: { container: Container }) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      <Link
        href={`/create/${container.id}`}
        className="flex justify-between p-2 md:p-3 hover:bg-background rounded-2xl"
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
            handleButtonClick={handleButtonClick}
          />
          <DeleteContainerComponent
            containerId={container.id}
            containerTitle={container.title}
            handleButtonClick={handleButtonClick}
          />
        </div>
      </Link>
    </>
  );
};
export default CardContainerComponent;
