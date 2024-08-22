import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { popUndoStack } from "@/redux/slice/undo.slice";
import { pushRedoStack } from "@/redux/slice/redo.slice";
import { setUndoRedoToDB } from "@/redux/slice/items.slice";
import { updateTrashToDB } from "@/redux/slice/trash.slice";
import { Item } from "@/types/item.type";
import { Undo2 } from "lucide-react";

const UndoComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const undoStack = useSelector((state: RootState) => state.undo);
  const { items } = useSelector((state: RootState) => state.items);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );
  const trashes = useSelector(
    (state: RootState) => state.trash
  ).containersTrash.find(
    (container) => container.id === slugContainerId
  )?.items;

  function syncTrashWithItemsAtUndo(lastState: Item[]) {
    const itemIds = lastState.map((item) => item.id);
    const filteredTrashes = trashes?.filter(
      (trash) => !itemIds.includes(trash.id)
    );

    if (!filteredTrashes) return;

    dispatch(
      updateTrashToDB({
        containerId: slugContainerId,
        updatedTrash: filteredTrashes,
      })
    );

    // ngembaliin ke trash
  }

  const handleClick = async () => {
    if (undoStack.length === 0) return;

    const lastState = undoStack[undoStack.length - 1];

    dispatch(pushRedoStack(items));

    dispatch(
      setUndoRedoToDB({ containerId: slugContainerId, undoRedo: lastState })
    );

    dispatch(popUndoStack());

    syncTrashWithItemsAtUndo(lastState);
  };

  return (
    <>
      <button
        className={`${
          undoStack.length == 0 ? "opacity-50" : "opacity-100"
        } flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap`}
        onClick={handleClick}
        disabled={undoStack.length === 0}
      >
        <Undo2 />
        Undo
      </button>
    </>
  );
};

export default UndoComponent;
