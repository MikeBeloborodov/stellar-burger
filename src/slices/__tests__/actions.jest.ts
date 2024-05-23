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
import { mockStore } from '../mockData';

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
        uniqueId: 'test_id_1'
      })
    );
    const after = selectConstructorItems(store.getState()).ingredients.length;
    expect(before).toBe(3);
    expect(after).toBe(2);
  });

  test('Test addIngredient', () => {
    const store = initStore();
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
    store.dispatch(
      addIngredient({
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
      })
    );

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
