import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "@/types/item.type";

const initialState: Item[][] = [];

const getSessionStorageUndo = () => {
  return JSON.parse(sessionStorage.getItem("undoStack") || "[]");
};

const setSessionStorageUndo = (undoStack: Item[][]) => {
  sessionStorage.setItem("undoStack", JSON.stringify(undoStack));
};

export const loadUndoStack = createAsyncThunk("undo/loadUndoStack", () => {
  return getSessionStorageUndo();
});

export const pushUndoStack = createAsyncThunk(
  "undo/pushUndoStack",
  (newItems: Item[]) => {
    const undoStack = getSessionStorageUndo();
    const updatedUndoStack = [...undoStack.slice(-9), newItems]; // Ensure the length of the stack remains within the limit
    setSessionStorageUndo(updatedUndoStack);
    return updatedUndoStack;
  }
);

export const popUndoStack = createAsyncThunk("undo/popUndoStack", () => {
  const undoStack = getSessionStorageUndo();
  const updatedUndoStack = undoStack.slice(0, -1);
  setSessionStorageUndo(updatedUndoStack);
  return updatedUndoStack;
});

export const clearUndoStack = createAsyncThunk("undo/clearUndoStack", () => {
  setSessionStorageUndo([]);
  return [];
});

const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUndoStack.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(pushUndoStack.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(popUndoStack.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(clearUndoStack.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default undoSlice.reducer;
