import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitMoney {
  containerId: string;
  initialMoney: number;
}

interface InitialState {
  initialMoney: InitMoney[];
}

const initialState: InitialState = {
  initialMoney: [],
};

const getLocalStorageItems = (): InitMoney[] => {
  return JSON.parse(localStorage.getItem("initialMoney") || "[]");
};

const setLocalStorageItems = (items: InitMoney[]): void => {
  localStorage.setItem("initialMoney", JSON.stringify(items));
};

export const loadInitialMoney = createAsyncThunk(
  "initialMoney/loadInitialMoney",
  async () => {
    return getLocalStorageItems();
  }
);

export const addContainerInitialMoney = createAsyncThunk(
  "initialMoney/addInitialMoney",
  async (containerId: string) => {
    const items = getLocalStorageItems();
    const newItem = { containerId, initialMoney: 0 };
    const updatedItems = [...items, newItem];
    setLocalStorageItems(updatedItems);
    return newItem;
  }
);

export const deleteContainerInitialMoney = createAsyncThunk(
  "initialMoney/deleteContainerInitialMoney",
  async (containerId: string) => {
    const items = getLocalStorageItems();
    const updatedItems = items.filter(
      (item) => item.containerId !== containerId
    );
    setLocalStorageItems(updatedItems);
    return containerId;
  }
);

export const editInitialMoney = createAsyncThunk(
  "initialMoney/editInitialMoney",
  async ({
    containerId,
    newInitialMoney,
  }: {
    containerId: string;
    newInitialMoney: number;
  }) => {
    const items = getLocalStorageItems();
    const index = items.findIndex((item) => item.containerId === containerId);
    if (index === -1) return { containerId, newInitialMoney };
    items[index].initialMoney = newInitialMoney;
    setLocalStorageItems(items);
    return { containerId, newInitialMoney };
  }
);

const initialMoneySlice = createSlice({
  name: "initialMoney",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadInitialMoney.fulfilled,
        (state, action: PayloadAction<InitMoney[]>) => {
          state.initialMoney = action.payload;
        }
      )
      .addCase(
        addContainerInitialMoney.fulfilled,
        (state, action: PayloadAction<InitMoney>) => {
          state.initialMoney.push(action.payload);
        }
      )
      .addCase(
        deleteContainerInitialMoney.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.initialMoney = state.initialMoney.filter(
            (item) => item.containerId !== action.payload
          );
        }
      )
      .addCase(
        editInitialMoney.fulfilled,
        (
          state,
          action: PayloadAction<
            { containerId: string; newInitialMoney: number } | undefined
          >
        ) => {
          if (!action.payload) return;
          const { containerId, newInitialMoney } = action.payload;
          const index = state.initialMoney.findIndex(
            (item) => item.containerId === containerId
          );
          if (index !== -1) {
            state.initialMoney[index].initialMoney = newInitialMoney;
          }
        }
      );
  },
});

export default initialMoneySlice.reducer;
