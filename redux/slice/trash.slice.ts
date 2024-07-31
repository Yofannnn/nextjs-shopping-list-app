import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addContainerTrash,
  deleteContainerTrash,
  getAllContainerTrash,
  getTrash,
  updateTrash,
} from "../../indexedDB/trash.indexedDb";
import { Item } from "../../types/item.type";

interface ContainerTrash {
  id: string;
  items: Item[];
}

interface TrashState {
  containersTrash: ContainerTrash[];
}

const initialState: TrashState = {
  containersTrash: [],
};

export const loadContainersTrash = createAsyncThunk<ContainerTrash[]>(
  "trash/loadContainerTrash",
  async () => {
    const containerTrash = await getAllContainerTrash();
    return containerTrash;
  }
);

export const addContainerTrashToDB = createAsyncThunk<
  ContainerTrash,
  ContainerTrash
>("trash/addContainerTrashToDB", async (newContainer) => {
  await addContainerTrash(newContainer);
  return newContainer;
});

export const deleteContainerTrashFromDB = createAsyncThunk<string, string>(
  "trash/deleteContainerTrashToDB",
  async (containerId) => {
    await deleteContainerTrash(containerId);
    return containerId;
  }
);

export const addTrashToDB = createAsyncThunk<
  { containerId: string; items: Item[] },
  { containerId: string; newTrash: Item }
>("trash/addTrashToDB", async ({ containerId, newTrash }) => {
  const containerTrash = await getTrash(containerId);
  const updatedTrashToSave = containerTrash
    ? [...containerTrash.items, newTrash]
    : [newTrash];
  await updateTrash(containerId, updatedTrashToSave);
  return { containerId, items: updatedTrashToSave };
});

export const updateTrashToDB = createAsyncThunk<
  { containerId: string; items: Item[] },
  { containerId: string; updatedTrash: Item[] }
>("trash/updateTrashToDB", async ({ containerId, updatedTrash }) => {
  await updateTrash(containerId, updatedTrash);
  return { containerId, items: updatedTrash };
});

export const deleteTrashFromDB = createAsyncThunk<
  { containerId: string; items: Item[] },
  { containerId: string; itemId: string }
>("trash/deleteTrashToDB", async ({ containerId, itemId }) => {
  const containerTrash = await getTrash(containerId);
  if (!containerTrash) return { containerId, items: [] };
  const items = containerTrash.items.filter((item) => item.id !== itemId);
  await updateTrash(containerId, items);
  return { containerId, items };
});

export const clearTrashFromDB = createAsyncThunk<
  { containerId: string; items: Item[] },
  string
>("trash/clearTrashToDB", async (containerId) => {
  await updateTrash(containerId, []);
  return { containerId, items: [] };
});

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleContainerUpdate = (
      state: TrashState,
      action: { payload: { containerId: string; items: Item[] } }
    ) => {
      const { containerId, items } = action.payload;
      const container = state.containersTrash.find((c) => c.id === containerId);
      if (container) {
        container.items = items;
      }
    };

    builder
      .addCase(loadContainersTrash.fulfilled, (state, action) => {
        state.containersTrash = action.payload;
      })
      .addCase(addContainerTrashToDB.fulfilled, (state, action) => {
        state.containersTrash.push(action.payload);
      })
      .addCase(deleteContainerTrashFromDB.fulfilled, (state, action) => {
        state.containersTrash = state.containersTrash.filter(
          (container) => container.id !== action.payload
        );
      })
      .addCase(addTrashToDB.fulfilled, handleContainerUpdate)
      .addCase(updateTrashToDB.fulfilled, handleContainerUpdate)
      .addCase(deleteTrashFromDB.fulfilled, handleContainerUpdate)
      .addCase(clearTrashFromDB.fulfilled, handleContainerUpdate);
  },
});

export default trashSlice.reducer;
