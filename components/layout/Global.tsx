"use client";

import Navigation from "../fragments/Navigation";
import store, { AppDispatch, RootState } from "../../redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "../../components/ui/toaster";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadColorTheme } from "../../redux/slice/color.slice";
import { setColorTheme } from "../../utils/color-themes";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <LayoutContent>{children}</LayoutContent>
      </NextThemesProvider>
    </Provider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const shouldRenderNavigation =
    !pathName.includes("/create/") && !pathName.includes("/ai");
  const dispatch: AppDispatch = useDispatch();
  const { colorTheme } = useSelector((state: RootState) => state.colorTheme);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(loadColorTheme());
    setColorTheme(colorTheme, theme);
  }, [dispatch, colorTheme, theme]);

  return (
    <>
      {children}
      {shouldRenderNavigation && <Navigation />}
      <Toaster />
    </>
  );
}
