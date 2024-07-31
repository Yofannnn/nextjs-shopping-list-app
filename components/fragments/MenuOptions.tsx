import ClearItemsComponent from "./ClearItems";
import InitialMoneyComponent from "./InitialMoney";
import AddNewItem from "./NewItem";
import RedoComponent from "./Redo";
import TotalComponent from "./Total";
import TrashComponent from "./Trash";
import UndoComponent from "./Undo";

const MenuOptions = () => {
  return (
    <>
      <div className="fixed bottom-0 sm:top-0 sm:sticky w-full sm:h-fit overflow-x-auto sm:w-1/5 z-40 bg-white dark:bg-black">
        <div className="flex flex-row sm:flex-col justify-start gap-6 sm:gap-4 px-2 sm:py-4 sm:mt-[65px]">
          <AddNewItem />
          <InitialMoneyComponent />
          <TotalComponent />
          <UndoComponent />
          <RedoComponent />
          <TrashComponent />
          <ClearItemsComponent />
        </div>
      </div>
    </>
  );
};

export default MenuOptions;
