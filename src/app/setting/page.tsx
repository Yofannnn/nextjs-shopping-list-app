import ColorThemeComponent from "../../../components/fragments/ColorTheme";
import FormatCurrencyComponent from "../../../components/fragments/FormatCurrency";
import SortItemsComponent from "../../../components/fragments/SortItems";
import ThemeSelectorComponent from "../../../components/fragments/ThemeSelector";

export default function SettingPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl text-center py-7">Setting</h1>
        <div className="w-full flex justify-center">
          <div className="w-[95%] md:w-2/4 flex flex-col">
            <ThemeSelectorComponent />
            <SortItemsComponent />
            <FormatCurrencyComponent />
            <ColorThemeComponent />
          </div>
        </div>
      </div>
    </>
  );
}
