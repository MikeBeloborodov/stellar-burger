import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  selectConstructorItems,
  selectErrorText,
  selectIngredients,
  selectIsAuthenticated,
  selectIsInit,
  selectIsModalOpened,
  selectLoading,
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectTodayOrders,
  selectTotalOrders,
  selectUser,
  selectUserOrders
} from '../stellarBurgerSlice';
import { mockStore } from '../mockData';

let store = configureStore({
  reducer: {
    stellarBurger: stellarBurgerSlice
  },
  preloadedState: {
    stellarBurger: mockStore
  }
});

describe('Test selectors', () => {
  test('Test selectUser', () => {
    const user = selectUser(store.getState());
    expect(user).toEqual({
      name: 'testUser',
      email: 'test@mail.com'
    });
  });

  test('Test selectIsInit', () => {
    const isInit = selectIsInit(store.getState());
    expect(isInit).toBe(false);
  });

  test('Test selectIsModalOpened', () => {
    const isModalOpened = selectIsModalOpened(store.getState());
    expect(isModalOpened).toBe(false);
  });

  test('Test selectErrorText', () => {
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('test error text');
  });

  test('Test selectIsAuthenticated', () => {
    const isAuthenticated = selectIsAuthenticated(store.getState());
    expect(isAuthenticated).toBe(true);
  });

  test('Test selectLoading', () => {
    const loading = selectLoading(store.getState());
    expect(loading).toBe(false);
  });

  test('Test selectOrderRequest', () => {
    const orderRequest = selectOrderRequest(store.getState());
    expect(orderRequest).toBe(false);
  });

  test('Test selectTotalOrders', () => {
    const totalOrders = selectTotalOrders(store.getState());
    expect(totalOrders).toBe(1000);
  });

  test('Test selectTodayOrders', () => {
    const todayOrders = selectTodayOrders(store.getState());
    expect(todayOrders).toBe(20);
  });

  test('Test selectIngredients', () => {
    const ingredients = selectIngredients(store.getState());
    expect(ingredients).toEqual(mockStore.ingredients);
  });

  test('Test selectConstructorItems', () => {
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(mockStore.constructorItems);
  });

  test('Test selectOrderModalData', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual(mockStore.orderModalData);
  });

  test('Test selectOrders', () => {
    const orders = selectOrders(store.getState());
    expect(orders).toEqual(mockStore.orders);
  });

  test('Test selectUserOrders', () => {
    const userOrders = selectUserOrders(store.getState());
    expect(userOrders).toEqual(mockStore.userOrders);
  });
});
