import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getLocalStorageColor = () => {
  return JSON.parse(localStorage.getItem("color-theme") || "default");
};

const setLocalStorageColor = (color: string) => {
  localStorage.setItem("color-theme", JSON.stringify(color));
};

export const loadColorTheme = createAsyncThunk("color/loadColorTheme", () => {
  return getLocalStorageColor();
});

export const setColorThemeToLocalStorage = createAsyncThunk(
  "color/setColorThemeToLocalStorage",
  (color: string) => {
    setLocalStorageColor(color);
    return color;
  }
);

const initialState = {
  colorTheme: "",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadColorTheme.fulfilled, (state, action) => {
        state.colorTheme = action.payload;
      })
      .addCase(setColorThemeToLocalStorage.fulfilled, (state, action) => {
        state.colorTheme = action.payload;
      });
  },
});

export default colorSlice.reducer;
