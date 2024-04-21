import {
  TLoginData,
  TRegisterData,
  getFeedsApi,
  getIngredientsApi,
  getUserApi,
  loginUserApi,
  orderBurgerApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorItems, TIngredient, TOrder, TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  orderModalData: TOrder | null;
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  errorText: string;
  isAuthChecked: boolean;
  isInit: boolean;
  user: TUser;
  orders: TOrder[];
  totalOrders: number;
  ordersToday: number;
};

const initContructorItems = {
  bun: {
    price: 0
  },
  ingredients: []
};

const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  orderModalData: null,
  constructorItems: initContructorItems,
  orderRequest: false,
  errorText: '',
  isAuthChecked: false,
  isInit: false,
  user: {
    name: '',
    email: ''
  },
  orders: [],
  totalOrders: 0,
  ordersToday: 0
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
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
      state.constructorItems = initContructorItems;
    },
    init(state) {
      state.isInit = true;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectErrorText: (state) => state.errorText,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user,
    selectOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.totalOrders,
    selectTodayOrders: (state) => state.ordersToday
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
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.errorText = action.error.message;
        }
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.isInit = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isInit = true;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthChecked = true;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.ordersToday = action.payload.totalToday;
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

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const getUserThunk = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const fetchFeed = createAsyncThunk('user/feed', async () =>
  getFeedsApi()
);

export const {
  selectLoading,
  selectIngredients,
  selectOrderModalData,
  selectConstructorItems,
  selectOrderRequest,
  selectErrorText,
  selectIsAuthChecked,
  selectUser,
  selectOrders,
  selectTotalOrders,
  selectTodayOrders
} = stellarBurgerSlice.selectors;
export const { addIngredient, init, closeOrderRequest } =
  stellarBurgerSlice.actions;
export default stellarBurgerSlice.reducer;
