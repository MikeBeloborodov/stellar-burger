import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  addIngredient,
  closeModal,
  closeOrderRequest,
  deleteIngredient,
  init,
  openModal,
  removeErrorText,
  removeOrders,
  removeUserOrders,
  selectConstructorItems,
  selectErrorText,
  selectIsInit,
  selectIsModalOpened,
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectUserOrders,
  setErrorText
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

describe('Test actions', () => {
  test('Test deleteIngredient', () => {
    const before = selectConstructorItems(store.getState()).ingredients.length;
    store.dispatch(
      deleteIngredient({
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        uniqueId: 'testid'
      })
    );
    const after = selectConstructorItems(store.getState()).ingredients.length;
    expect(before).toBe(1);
    expect(after).toBe(0);
  });

  test('Test addIngredients', () => {
    store.dispatch(
      addIngredient({
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
      })
    );

    const ingredients = selectConstructorItems(store.getState()).ingredients;
    expect(ingredients.length).toEqual(1);
  });

  test('Test closeOrderRequest', () => {
    store.dispatch(closeOrderRequest());

    const orderRequest = selectOrderRequest(store.getState());
    const orderModalData = selectOrderModalData(store.getState());
    const constructorItems = selectConstructorItems(store.getState());

    expect(orderRequest).toBe(false);
    expect(orderModalData).toBe(null);
    expect(constructorItems).toEqual({
      bun: {
        price: 0
      },
      ingredients: []
    });
  });

  test('Test removeOrders', () => {
    const initialOrders = selectOrders(store.getState()).length;
    store.dispatch(removeOrders());
    const orders = selectOrders(store.getState()).length;
    expect(initialOrders).toBe(2);
    expect(orders).toBe(0);
  });

  test('Test removeUserOrders', () => {
    const initialOrders = selectUserOrders(store.getState())!.length;
    store.dispatch(removeUserOrders());
    const orders = selectUserOrders(store.getState());
    expect(initialOrders).toBe(2);
    expect(orders).toBe(null);
  });

  test('Test init', () => {
    const beforeInit = selectIsInit(store.getState());
    store.dispatch(init());
    const afterInit = selectIsInit(store.getState());
    expect(beforeInit).toBe(false);
    expect(afterInit).toBe(true);
  });

  test('Test openModal', () => {
    const beforeOpen = selectIsModalOpened(store.getState());
    store.dispatch(openModal());
    const afterOpen = selectIsModalOpened(store.getState());
    expect(beforeOpen).toBe(false);
    expect(afterOpen).toBe(true);
  });

  test('Test closeModal', () => {
    store.dispatch(closeModal());
    const isOpen = selectIsModalOpened(store.getState());
    expect(isOpen).toBe(false);
  });

  test('Test setErrorText', () => {
    store.dispatch(setErrorText('my test error'));
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('my test error');
  });

  test('Test removeErrorText', () => {
    store.dispatch(setErrorText('Error here!'));
    store.dispatch(removeErrorText());
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('');
  });
});
