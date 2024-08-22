"use client";

import TopBarComponent from "@/components/fragments/TopBar";
import WrapperListItems from "@/components/fragments/ListItems";
import MenuOptions from "@/components/fragments/MenuOptions";
import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setSlugContainerId } from "@/redux/slice/slug.slice";
import { loadCurrency } from "@/redux/slice/currency.slice";
import { loadSort } from "@/redux/slice/sort.slice";
import { fetchItems } from "@/redux/slice/items.slice";
import { loadInitialMoney } from "@/redux/slice/initmoney.slice";
import { loadContainersTrash } from "@/redux/slice/trash.slice";
import { clearRedoStack, loadRedoStack } from "@/redux/slice/redo.slice";
import { clearUndoStack, loadUndoStack } from "@/redux/slice/undo.slice";

export default function ReadWritePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItems(slug));
    dispatch(loadContainersTrash());
    dispatch(loadUndoStack());
    dispatch(loadRedoStack());
    dispatch(loadInitialMoney());
    dispatch(loadCurrency());
    dispatch(loadSort());

    const storedSlug = sessionStorage.getItem("slug");
    if (storedSlug !== slug) {
      sessionStorage.removeItem("undoStack");
      sessionStorage.removeItem("redoStack");
      dispatch(clearUndoStack());
      dispatch(clearRedoStack());
    }
    sessionStorage.setItem("slug", slug);

    dispatch(setSlugContainerId(slug));
  }, [dispatch, slug]);

  if (status === "loading" || status === "idle")
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <CircularProgress label="Loading..." />
      </div>
    );

  if (status === "failed") throw new Error("Container not found.");

  return (
    <>
      <TopBarComponent containerId={slug} />
      <div className="flex justify-center">
        <MenuOptions />
        <WrapperListItems />
      </div>
    </>
  );
}
