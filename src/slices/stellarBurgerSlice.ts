import {
  TLoginData,
  getIngredientsApi,
  loginUserApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorItems, TIngredient, TOrder } from '@utils-types';

type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  orderModalData: TOrder | null;
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  errorText: string;
};

const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  orderModalData: null,
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  errorText: ''
};

const stellarBurgerSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    makeOrderRequest(state, action: PayloadAction<TOrder>) {
      state.orderModalData = action.payload;
      state.orderRequest = true;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const {
  selectLoading,
  selectIngredients,
  selectOrderModalData,
  selectConstructorItems,
  selectOrderRequest,
  selectErrorText
} = stellarBurgerSlice.selectors;
export const { addIngredient, makeOrderRequest } = stellarBurgerSlice.actions;
export default stellarBurgerSlice.reducer;
