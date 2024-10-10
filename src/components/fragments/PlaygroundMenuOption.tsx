import StartingBudgetComponent from "./StartingBudget";
import TrashComponent from "./Trash";
import ClearItemsComponent from "./ClearItems";
import ThemeSelectorComponent from "./ThemeSelector";
import SortItemsComponent from "./SortItems";
import FormatCurrencyComponent from "./FormatCurrency";
import ColorThemeComponent from "./ColorTheme";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const PlaygroundMenuOptionComponent = () => {
  const buttonClassName =
    "syne w-full hover:bg-muted text-start px-5 py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="inline-block p-2 rounded-full ml-2">
          <Menu className="size-6 md:size-7" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="syne text-lg md:text-xl lg:text-2xl">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="grid pt-6 pb-4">
          <StartingBudgetComponent className={buttonClassName} />
          <TrashComponent className={buttonClassName} />
          <ClearItemsComponent className={buttonClassName} />
          <ThemeSelectorComponent className={buttonClassName} />
          <SortItemsComponent className={buttonClassName} />
          <FormatCurrencyComponent className={buttonClassName} />
          <ColorThemeComponent className={buttonClassName} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlaygroundMenuOptionComponent;
