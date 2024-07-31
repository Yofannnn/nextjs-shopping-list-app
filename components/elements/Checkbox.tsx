import { useTheme } from "next-themes";
import { Item } from "../../types/item.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { editItemsToDB } from "../../redux/slice/items.slice";
import { pushUndoStack } from "../../redux/slice/undo.slice";
import { clearRedoStack } from "../../redux/slice/redo.slice";

const CheckboxItem = ({ item }: { item: Item }) => {
  const { theme } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.items);
  const { slugContainerId } = useSelector(
    (state: RootState) => state.slugContainerId
  );

  const handleChange = () => {
    dispatch(pushUndoStack(items));

    dispatch(clearRedoStack());

    const index = items.findIndex((i: Item) => i.id === item.id);
    if (index === -1) return;

    // Create a copy of the item and update its checked property
    const editedItem = { ...items[index], checked: !items[index].checked };

    // Create a new array with the updated item
    const editedItems = [...items];
    editedItems[index] = editedItem;

    dispatch(
      editItemsToDB({
        containerId: slugContainerId,
        editedItem: editedItems[index],
      })
    );
  };

  return (
    <label className="container-input-checkbox w-fit h-fit">
      <input
        type="checkbox"
        className="hidden"
        checked={item.checked}
        onChange={handleChange}
      />
      <svg
        viewBox="0 0 64 64"
        className="overflow-visible w-4 h-4 md:w-6 md:h-6"
      >
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className="path"
          style={
            theme == "dark"
              ? { stroke: "white" }
              : {
                  stroke: "black",
                }
          }
        ></path>
      </svg>
    </label>
  );
};

export default CheckboxItem;
