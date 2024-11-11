import { createSlice } from "@reduxjs/toolkit";

const searchItemSlice = createSlice({
  name: "searchItem",
  initialState: {
    searchItem: "",
  },
  reducers: {
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
  },
});

export const { setSearchItem } = searchItemSlice.actions;
export default searchItemSlice.reducer;
