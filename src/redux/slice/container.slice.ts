import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Container } from "@/types/container.type";
import {
  addContainer,
  deleteContainer,
  editContainer,
  getAllContainers,
} from "@/indexedDB/container.indexedDB";

interface ContainerState {
  containers: Container[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContainerState = {
  containers: [],
  status: "idle",
  error: null,
};

export const fetchContainer = createAsyncThunk<
  Container[],
  void,
  { rejectValue: string }
>("container/fetchContainer", async (_, { rejectWithValue }) => {
  try {
    const containers = await getAllContainers();
    return containers;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch containers.");
  }
});

export const addContainerToDB = createAsyncThunk<Container, Container>(
  "container/addContainerToDB",
  async (newContainer) => {
    await addContainer(newContainer);
    return newContainer;
  }
);

export const editContainerTitleToDB = createAsyncThunk<
  { containerId: string; newTitle: string },
  { containerId: string; newTitle: string }
>("container/editContainerTitleToDB", async ({ containerId, newTitle }) => {
  await editContainer(containerId, newTitle);
  return { containerId, newTitle };
});

export const deleteContainerToDB = createAsyncThunk<string, string>(
  "container/deleteContainerToDB",
  async (id) => {
    await deleteContainer(id);
    return id;
  }
);

const containerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: ContainerState) => {
      state.status = "loading";
    };

    const handleRejected = (state: ContainerState, action: any) => {
      state.status = "failed";
      state.error = action.error.message || "An error occurred";
    };

    builder
      .addCase(fetchContainer.pending, handlePending)
      .addCase(fetchContainer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.containers = action.payload;
      })
      .addCase(fetchContainer.rejected, handleRejected)
      .addCase(addContainerToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.containers.push(action.payload);
      })
      .addCase(addContainerToDB.rejected, handleRejected)
      .addCase(editContainerTitleToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.containers.findIndex(
          (container) => container.id === action.payload.containerId
        );
        if (index !== -1) {
          state.containers[index].title = action.payload.newTitle;
        }
      })
      .addCase(editContainerTitleToDB.rejected, handleRejected)
      .addCase(deleteContainerToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.containers = state.containers.filter(
          (container) => container.id !== action.payload
        );
      })
      .addCase(deleteContainerToDB.rejected, handleRejected);
  },
});

export default containerSlice.reducer;
