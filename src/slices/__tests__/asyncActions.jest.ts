import { expect, test, describe, jest } from '@jest/globals';
import stellarBurgerSlice, {
  fetchFeed,
  fetchIngredients,
  fetchLoginUser,
  fetchLogout,
  fetchNewOrder,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchUserOrders,
  getUserThunk,
  initialState
} from '../stellarBurgerSlice';

describe('Test async actions', () => {
  test('Test getUserThunk pending', () => {
    const state = stellarBurgerSlice(initialState, getUserThunk.pending(''));

    expect(state.loading).toBe(true);
  });

  test('Test getUserThunk fullfiled', () => {
    const mockResponse = {
      success: true,
      user: { name: 'user', email: 'user@mail.ru' }
    };
    const state = stellarBurgerSlice(
      initialState,
      getUserThunk.fulfilled(mockResponse, '')
    );

    expect(state.user).toEqual(mockResponse.user);
  });

  test('Test getUserTnunk rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      getUserThunk.rejected(mockAnswer, '')
    );

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
  });

  test('Test fetchIngredients pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.pending('')
    );

    expect(state.loading).toBe(true);
  });

  test('Test fetchIngredients fulfilled', () => {
    const mockResponse = [
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
      }
    ];
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.fulfilled(mockResponse, '')
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockResponse);
  });

  test('Test fetchIngredients rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.rejected(mockAnswer, '')
    );

    expect(state.loading).toBe(false);
  });

  test('Test fetchNewOrder pending', () => {
    const mockOrder = ['testid1', 'testid2', 'testid3'];
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.pending('', mockOrder)
    );

    expect(state.orderRequest).toBe(true);
  });

  test('Test fetchNewOrder rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.rejected(mockAnswer, '', [''])
    );

    expect(state.orderRequest).toBe(false);
  });

  test('Test fetchNewOrder fulfilled', () => {
    const mockResponse = {
      success: true,
      name: 'testname',
      order: {
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
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.fulfilled(mockResponse, '', [''])
    );

    expect(state.orderModalData).toEqual(mockResponse.order);
    expect(state.orderRequest).toBe(false);
  });

  test('Test fetchLoginUser pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchLoginUser.pending('', { email: 'test@mail.ru', password: 'test' })
    );

    expect(state.loading).toBe(true);
  });

  test('Test fetchLoginUser rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchLoginUser.rejected(mockAnswer, '', {
        email: 'test@mail.ru',
        password: 'test'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.errorText).toBe('error');
  });

  test('Test fetchLoginUser fulfiled', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchLoginUser.fulfilled(
        {
          success: true,
          refreshToken: 'testtoken',
          accessToken: 'testaccess',
          user: { name: 'testuser', email: 'testuser@mail.ru' }
        },
        '',
        { password: 'testuser', email: 'testuser@mail.ru' }
      )
    );

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('Test fetchRegisterUser pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchRegisterUser.pending(
        '',
        { name: 'user', email: 'test@mail.ru', password: 'test' },
        ''
      )
    );

    expect(state.loading).toBe(true);
  });

  test('Test fetchRegisterUser rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchRegisterUser.rejected(mockAnswer, '', {
        name: 'user',
        email: 'test@mail.ru',
        password: 'test'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.errorText).toBe('error');
  });

  test('Test fetchRegisterUser fulfilled', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchRegisterUser.fulfilled(
        {
          success: true,
          refreshToken: 'testtoken',
          accessToken: 'testaccess',
          user: { name: 'testuser', email: 'testuser@mail.ru' }
        },
        '',
        { name: 'user', password: 'testuser', email: 'testuser@mail.ru' }
      )
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
  });

  test('Test fetchFeed pending', () => {
    const state = stellarBurgerSlice(initialState, fetchFeed.pending(''));

    expect(state.loading).toBe(true);
  });

  test('Test fetchFeed rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchFeed.rejected(mockAnswer, '')
    );

    expect(state.loading).toBe(false);
  });

  test('Test fetchFeed fulfilled', () => {
    const mockResponse = {
      success: true,
      total: 100,
      totalToday: 10,
      orders: [
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
      ]
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchFeed.fulfilled(mockResponse, '')
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockResponse.orders);
    expect(state.totalOrders).toEqual(mockResponse.total);
    expect(state.ordersToday).toEqual(mockResponse.totalToday);
  });

  test('Test fetchUserOrders pending', () => {
    const state = stellarBurgerSlice(initialState, fetchUserOrders.pending(''));

    expect(state.loading).toBe(true);
  });

  test('Test fetchUserOrders rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchUserOrders.rejected(mockAnswer, '')
    );

    expect(state.loading).toBe(false);
  });

  test('Test fetchUserOrders fulfilled', () => {
    const mockResponse = [
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
    ];
    const state = stellarBurgerSlice(
      initialState,
      fetchUserOrders.fulfilled(mockResponse, '')
    );

    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(mockResponse);
  });

  test('Test fetchLogout pending', () => {
    const state = stellarBurgerSlice(initialState, fetchLogout.pending(''));

    expect(state.loading).toBe(true);
  });

  test('Test fetchLogout rejected', () => {
    const mockError = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchLogout.rejected(mockError, '')
    );

    expect(state.loading).toBe(false);
  });

  test('Test fetchLogout fulfilled', () => {
    const mockAnswer = { success: true };
    const state = stellarBurgerSlice(
      initialState,
      fetchLogout.fulfilled(mockAnswer, '')
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.isAuthenticated).toBe(false);
  });

  test('Test fetchUpdateUser pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchUpdateUser.pending('', { name: 'test' })
    );
    expect(state.loading).toBe(true);
  });

  test('Test fetchUpdateUser rejected', () => {
    const mockError = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchUpdateUser.rejected(mockError, '', { name: 'test' })
    );
    expect(state.loading).toBe(false);
  });

  test('Test fetchUpdateUser fulfilled', () => {
    const mockUser = { name: 'testuser', email: 'changedEmail@mail.ru' };
    const mockResponse = {
      success: true,
      user: mockUser
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchUpdateUser.fulfilled(mockResponse, '', mockUser)
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });
});
