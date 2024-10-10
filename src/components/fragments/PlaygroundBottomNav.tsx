import AddNewItem from "./NewItem";
import RedoComponent from "./Redo";
import ExpenseOverviewComponent from "./ExpenseOverview";
import UndoComponent from "./Undo";

const PlaygroundBottomNavComponent = () => {
  const buttonClassName =
    "syne flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 sm:hover:bg-muted text-nowrap text-xs sm:text-sm md:text-base lg:text-lg";

  return (
    <>
      <div className="fixed bottom-0 sm:top-0 sm:sticky w-full sm:h-fit overflow-x-auto sm:w-1/5 z-40">
        <div className="flex flex-row sm:flex-col justify-evenly gap-6 sm:gap-4 px-2 sm:py-4 sm:mt-[65px]">
          <AddNewItem className={buttonClassName} />
          <UndoComponent className={buttonClassName} />
          <RedoComponent className={buttonClassName} />
          <ExpenseOverviewComponent className={buttonClassName} />
        </div>
      </div>
    </>
  );
};

export default PlaygroundBottomNavComponent;
