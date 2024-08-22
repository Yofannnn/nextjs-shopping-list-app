import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "",
};

const getLocalStorageSort = () => {
  return JSON.parse(localStorage.getItem("sort") || "time");
};

const setLocalStorageSort = (sortState: string) => {
  localStorage.setItem("sort", JSON.stringify(sortState));
};

export const loadSort = createAsyncThunk("sort/loadSort", () => {
  return getLocalStorageSort();
});

export const setSortToLocalStorage = createAsyncThunk(
  "sort/setSortToLocalStorage",
  (sortState: string) => {
    setLocalStorageSort(sortState);
    return sortState;
  }
);

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSort.fulfilled, (state, action) => {
        state.sort = action.payload;
      })
      .addCase(setSortToLocalStorage.fulfilled, (state, action) => {
        state.sort = action.payload;
      });
  },
});

export default sortSlice.reducer;
