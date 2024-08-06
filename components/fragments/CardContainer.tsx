import { Container } from "../../types/container.type";
import EditContainerComponent from "./EditContainer";
import DeleteContainerComponent from "./DeleteContainer";

const CardContainerComponent = ({ container }: { container: Container }) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      <a
        href={`/create/${container.id}`}
        className="flex justify-between p-2 md:p-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-2xl"
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
      </a>
    </>
  );
};
export default CardContainerComponent;
