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

afterAll(() => {
  store = configureStore({
    reducer: {
      stellarBurger: stellarBurgerSlice
    },
    preloadedState: {
      stellarBurger: mockStore
    }
  });
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
    expect(ingredients).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]);
  });

  test('Test selectConstructorItems', () => {
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(mockStore.constructorItems);
  });

  test('Test selectOrderModalData', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual({
      ingredients: ['testid1', 'testid2'],
      _id: '664e973297ede0001d06bdbe',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-23T01:09:06.622Z',
      updatedAt: '2024-05-23T01:09:06.967Z',
      number: 40682
    });
  });

  test('Test selectOrders', () => {
    const orders = selectOrders(store.getState());
    expect(orders).toEqual([
      {
        _id: '664e927097ede0001d06bdb9',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-05-23T00:48:48.039Z',
        updatedAt: '2024-05-23T00:48:48.410Z',
        number: 40680
      },
      {
        _id: '664e85e497ede0001d06bda7',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-05-22T23:55:16.472Z',
        updatedAt: '2024-05-22T23:55:16.866Z',
        number: 40679
      }
    ]);
  });

  test('Test selectUserOrders', () => {
    const userOrders = selectUserOrders(store.getState());
    expect(userOrders).toEqual([
      {
        _id: '6627770797ede0001d067400',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-04-23T08:53:27.817Z',
        updatedAt: '2024-04-23T08:53:28.481Z',
        number: 38671
      },
      {
        _id: '664e927097ede0001d06bdb9',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-05-23T00:48:48.039Z',
        updatedAt: '2024-05-23T00:48:48.410Z',
        number: 40680
      }
    ]);
  });
});
