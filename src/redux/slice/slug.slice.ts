import { createSlice } from "@reduxjs/toolkit";

const slugContainerIdSlice = createSlice({
  name: "slugContainerId",
  initialState: {
    slugContainerId: "",
  },
  reducers: {
    setSlugContainerId: (state, action) => {
      state.slugContainerId = action.payload;
    },
  },
});

export const { setSlugContainerId } = slugContainerIdSlice.actions;
export default slugContainerIdSlice.reducer;
