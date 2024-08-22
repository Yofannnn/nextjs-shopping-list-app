import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getLocalStorageCurrency = () => {
  return JSON.parse(localStorage.getItem("currency") || "id-ID,IDR");
};

const setLocalStorageCurrency = (currency: string) => {
  localStorage.setItem("currency", JSON.stringify(currency));
};

export const loadCurrency = createAsyncThunk("currency/loadCurrency", () => {
  return getLocalStorageCurrency();
});

export const setCurrencyToLocalStorage = createAsyncThunk(
  "currency/setCurrencyToLocalStorage",
  (currency: string) => {
    setLocalStorageCurrency(currency);
    return currency;
  }
);

const initialState = {
  currency: "",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      })
      .addCase(setCurrencyToLocalStorage.fulfilled, (state, action) => {
        state.currency = action.payload;
      });
  },
});

export default currencySlice.reducer;
