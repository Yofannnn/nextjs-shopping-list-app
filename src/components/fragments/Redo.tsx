import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { pushUndoStack } from "@/redux/slice/undo.slice";
import { popRedoStack } from "@/redux/slice/redo.slice";
import { setUndoRedoToDB } from "@/redux/slice/items.slice";
import { updateTrashToDB } from "@/redux/slice/trash.slice";
import { Item } from "@/types/item.type";
import { Redo2 } from "lucide-react";

const RedoComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const redoStack = useSelector((state: RootState) => state.redo);
  const { items } = useSelector((state: RootState) => state.items);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );

  const trashes = useSelector(
    (state: RootState) => state.trash
  ).containersTrash.find(
    (container) => container.id === slugContainerId
  )?.items;

  function syncTrashWithItemsAtRedo(lastState: Item[]) {
    const itemIds = lastState.map((item) => item.id);
    const filteredTrashes = trashes?.filter(
      (trash) => !itemIds.includes(trash.id)
    );

    if (!filteredTrashes) return;

    if (lastState.length < items.length) {
      // Find the item that was deleted and should be moved to trash
      const deletedItem = items.find(
        (item) => !lastState.some((i) => i.id === item.id)
      );

      if (deletedItem) {
        const updatedTrash = [...filteredTrashes, deletedItem];
        dispatch(
          updateTrashToDB({
            containerId: slugContainerId,
            updatedTrash: updatedTrash,
          })
        );
        return;
      }
    }

    dispatch(
      updateTrashToDB({
        containerId: slugContainerId,
        updatedTrash: filteredTrashes,
      })
    );
  }

  const handleClick = async () => {
    if (redoStack.length === 0) return;

    const lastState = redoStack[redoStack.length - 1];

    dispatch(
      setUndoRedoToDB({
        containerId: slugContainerId,
        undoRedo: lastState,
      })
    );

    dispatch(pushUndoStack(items));

    dispatch(popRedoStack());

    syncTrashWithItemsAtRedo(lastState);
  };

  return (
    <>
      <button
        className={`${
          redoStack.length == 0 ? "opacity-50" : "opacity-100"
        } flex flex-col md:flex-row items-center md:gap-2 py-1 md:py-3 md:pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-nowrap`}
        onClick={handleClick}
        disabled={redoStack.length === 0}
      >
        <Redo2 />
        Redo
      </button>
    </>
  );
};

export default RedoComponent;
