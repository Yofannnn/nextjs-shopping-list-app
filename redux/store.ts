import { configureStore } from "@reduxjs/toolkit";
import containerReducer from "./slice/container.slice";
import itemsReducer from "./slice/items.slice";
import slugContainerIdReducer from "./slice/slug.slice";
import initialMoneyReducer from "./slice/initmoney.slice";
import undoReducer from "./slice/undo.slice";
import redoReducer from "./slice/redo.slice";
import trashReducer from "./slice/trash.slice";
import sortReducer from "./slice/sort.slice";
import currencyReducer from "./slice/currency.slice";

const store = configureStore({
  reducer: {
    container: containerReducer,
    items: itemsReducer,
    slugContainerId: slugContainerIdReducer,
    initialMoney: initialMoneyReducer,
    undo: undoReducer,
    redo: redoReducer,
    trash: trashReducer,
    sort: sortReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
