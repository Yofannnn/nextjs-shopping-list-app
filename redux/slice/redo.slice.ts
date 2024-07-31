import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types/item.type";

const initialState: Item[][] = [];

const getSessionStorageRedo = () => {
  return JSON.parse(sessionStorage.getItem("redoStack") || "[]");
};

const setSessionStorageRedo = (redoStack: Item[][]) => {
  sessionStorage.setItem("redoStack", JSON.stringify(redoStack));
};

export const loadRedoStack = createAsyncThunk("redo/loadRedoStack", () => {
  return getSessionStorageRedo();
});

export const pushRedoStack = createAsyncThunk(
  "redo/pushRedoStack",
  (newItems: Item[]) => {
    const updatedRedoStack = [...getSessionStorageRedo(), newItems];
    setSessionStorageRedo(updatedRedoStack);
    return updatedRedoStack;
  }
);

export const popRedoStack = createAsyncThunk("redo/popRedoStack", () => {
  const redoStack = getSessionStorageRedo();
  const updatedRedoStack = redoStack.slice(0, -1);
  setSessionStorageRedo(updatedRedoStack);
  return updatedRedoStack;
});

export const clearRedoStack = createAsyncThunk("redo/clearRedoStack", () => {
  setSessionStorageRedo([]);
  return [];
});

const redoSlice = createSlice({
  name: "redo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRedoStack.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(pushRedoStack.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(popRedoStack.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(clearRedoStack.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default redoSlice.reducer;
