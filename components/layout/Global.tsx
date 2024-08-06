"use client";

import Navigation from "../fragments/Navigation";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "../../components/ui/toaster";
import { usePathname } from "next/navigation";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const shouldRenderNavigation = !pathName.includes("/create/") && !pathName.includes("/ai");

  return (
    <>
      <Provider store={store}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
          {shouldRenderNavigation && <Navigation />}
          <Toaster />
        </NextThemesProvider>
      </Provider>
    </>
  );
}
