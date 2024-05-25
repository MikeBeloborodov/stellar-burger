import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  addIngredient,
  closeModal,
  closeOrderRequest,
  deleteIngredient,
  init,
  moveIngredientDown,
  moveIngredientUp,
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
import { mockStore, mockIngredient, mockBun } from '../mockData';

function initStore() {
  return configureStore({
    reducer: {
      stellarBurger: stellarBurgerSlice
    },
    preloadedState: {
      stellarBurger: mockStore
    }
  });
}

describe('Test actions', () => {
  test('Test deleteIngredient', () => {
    const store = initStore();
    const before = selectConstructorItems(store.getState()).ingredients.length;
    store.dispatch(deleteIngredient(mockIngredient));
    const after = selectConstructorItems(store.getState()).ingredients.length;
    expect(before).toBe(3);
    expect(after).toBe(2);
  });

  test('Test addIngredient', () => {
    const store = initStore();
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(addIngredient(mockBun));

    const constructor = selectConstructorItems(store.getState());
    expect(constructor.ingredients.length).toEqual(4);
    expect(constructor.bun.name === 'Краторная булка N-200i');
  });

  test('Test closeOrderRequest', () => {
    const store = initStore();
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
    const store = initStore();
    const initialOrders = selectOrders(store.getState()).length;
    store.dispatch(removeOrders());
    const orders = selectOrders(store.getState()).length;
    expect(initialOrders).toBe(2);
    expect(orders).toBe(0);
  });

  test('Test removeUserOrders', () => {
    const store = initStore();
    const initialOrders = selectUserOrders(store.getState())!.length;
    store.dispatch(removeUserOrders());
    const orders = selectUserOrders(store.getState());
    expect(initialOrders).toBe(2);
    expect(orders).toBe(null);
  });

  test('Test init', () => {
    const store = initStore();
    const beforeInit = selectIsInit(store.getState());
    store.dispatch(init());
    const afterInit = selectIsInit(store.getState());
    expect(beforeInit).toBe(false);
    expect(afterInit).toBe(true);
  });

  test('Test openModal', () => {
    const store = initStore();
    const beforeOpen = selectIsModalOpened(store.getState());
    store.dispatch(openModal());
    const afterOpen = selectIsModalOpened(store.getState());
    expect(beforeOpen).toBe(false);
    expect(afterOpen).toBe(true);
  });

  test('Test closeModal', () => {
    const store = initStore();
    store.dispatch(closeModal());
    const isOpen = selectIsModalOpened(store.getState());
    expect(isOpen).toBe(false);
  });

  test('Test setErrorText', () => {
    const store = initStore();
    store.dispatch(setErrorText('my test error'));
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('my test error');
  });

  test('Test removeErrorText', () => {
    const store = initStore();
    store.dispatch(setErrorText('Error here!'));
    store.dispatch(removeErrorText());
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('');
  });

  test('Test moveIngredientUp', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const lastIngredient = ingredients[ingredients.length - 1];

    store.dispatch(moveIngredientUp(lastIngredient));

    ingredients = selectConstructorItems(store.getState()).ingredients;

    expect(ingredients[ingredients.length - 2]).toEqual(lastIngredient);
  });

  test('Test moveIngredientDown', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const firstIngredient = ingredients[0];

    store.dispatch(moveIngredientDown(firstIngredient));

    ingredients = selectConstructorItems(store.getState()).ingredients;

    expect(ingredients[1]).toEqual(firstIngredient);
  });
});
