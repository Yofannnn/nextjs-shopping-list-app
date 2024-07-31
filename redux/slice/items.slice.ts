import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getListItems, updateItems } from "../../indexedDB/item.indexedDB";
import { Item } from "../../types/item.type";

interface ItemState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk<Item[], string>(
  "items/fetchItems",
  async (containerId, { rejectWithValue }) => {
    try {
      const container = await getListItems(containerId);
      if (!container) {
        return rejectWithValue("Container not found.");
      }
      return container.items || [];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch items.");
    }
  }
);

export const addItemsToDB = createAsyncThunk<
  Item[],
  { containerId: string; newItem: Item }
>("items/addItemsToDB", async ({ containerId, newItem }) => {
  const container = await getListItems(containerId);
  const itemsToSave = container ? [...container.items, newItem] : [newItem];
  await updateItems(containerId, itemsToSave);
  return itemsToSave;
});

export const editItemsToDB = createAsyncThunk<
  Item[],
  { containerId: string; editedItem: Item }
>("items/editItemsToDB", async ({ containerId, editedItem }) => {
  const container = await getListItems(containerId);
  if (!container) return [];
  const items = container.items.map((item) =>
    item.id === editedItem.id ? editedItem : item
  );
  await updateItems(containerId, items);
  return items;
});

export const deleteItemsFromDB = createAsyncThunk<
  Item[],
  { containerId: string; itemId: string }
>("items/deleteItemsFromDB", async ({ containerId, itemId }) => {
  const container = await getListItems(containerId);
  if (!container) return [];
  const items = container.items.filter((item) => item.id !== itemId);
  await updateItems(containerId, items);
  return items;
});

export const setUndoRedoToDB = createAsyncThunk<
  Item[],
  { containerId: string; undoRedo: Item[] }
>("items/setUndoRedoToDB", async ({ containerId, undoRedo }) => {
  await updateItems(containerId, undoRedo);
  return undoRedo;
});

export const clearItemsFromDb = createAsyncThunk<Item[], string>(
  "items/clearItems",
  async (containerId) => {
    await updateItems(containerId, []);
    return [];
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: ItemState) => {
      state.status = "loading";
    };

    const handleRejected = (state: ItemState, action: any) => {
      state.status = "failed";
      state.error = action.error.message || "An error occurred";
    };

    builder
      .addCase(fetchItems.pending, handlePending)
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, handleRejected)
      .addCase(
        addItemsToDB.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(addItemsToDB.rejected, handleRejected)
      .addCase(
        editItemsToDB.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(editItemsToDB.rejected, handleRejected)
      .addCase(
        deleteItemsFromDB.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(deleteItemsFromDB.rejected, handleRejected)
      .addCase(
        setUndoRedoToDB.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(setUndoRedoToDB.rejected, handleRejected)
      .addCase(
        clearItemsFromDb.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(clearItemsFromDb.rejected, handleRejected);
  },
});

export default itemSlice.reducer;
