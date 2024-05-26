import { expect, test, describe, jest } from '@jest/globals';
import * as API from '../burger-api';

async function getMockResponse(data: any, ok: boolean = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data)
  });
}

const originalFetch = global.fetch;

afterAll(() => {
  global.fetch = originalFetch;
});

describe('Test api', () => {
  global.document = { cookie: 'accessToken=test_val' } as any;
  global.localStorage = { getItem: () => 'testItem', setItem: () => {} } as any;
  const mockData = {
    success: true,
    data: 'test data',
    orders: ['test1', 'test2']
  };
  const mockError = {
    success: false,
    name: 'error',
    message: 'jwt expired'
  };

  test('Test getUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getUserApi');
    const res = await API.getUserApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test logoutApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'logoutApi');
    const res = await API.logoutApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test updateUser', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const mockUserData = { name: 'test', email: 'test@mail.com' };
    const spy = jest.spyOn(API, 'updateUserApi');
    const res = await API.updateUserApi(mockUserData);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test resetPasswordApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const mockUserData = { password: 'test', token: 'testtoken' };
    const spy = jest.spyOn(API, 'resetPasswordApi');
    const res = await API.resetPasswordApi(mockUserData);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test resetPasswordApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    const mockUserData = { password: 'test', token: 'testtoken' };
    await API.resetPasswordApi(mockUserData).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  test('Test forgotPasswordApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const mockUserData = { email: 'test@mail.com' };
    const spy = jest.spyOn(API, 'forgotPasswordApi');
    const res = await API.forgotPasswordApi(mockUserData);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test forgotPasswordApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.forgotPasswordApi({ email: 'test@mail.com' }).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  test('Test loginUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const mockUserData = { email: 'test@mail.com', password: 'test' };
    const spy = jest.spyOn(API, 'loginUserApi');
    const res = await API.loginUserApi(mockUserData);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test loginUserApi fail', async () => {
    const mockUserData = { email: 'test@mail.com', password: 'test' };
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.loginUserApi(mockUserData).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  test('Test registerUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const mockUserData = {
      name: 'name',
      email: 'test@mail.com',
      password: 'test'
    };
    const spy = jest.spyOn(API, 'registerUserApi');
    const res = await API.registerUserApi(mockUserData);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test registerUserApi fail', async () => {
    const mockUserData = {
      name: 'name',
      email: 'test@mail.com',
      password: 'test'
    };
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.registerUserApi(mockUserData).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  test('Test getOrderByNumberApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getOrderByNumberApi');
    const res = await API.getOrderByNumberApi(123);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test orderBurgetApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const burger = ['testid1', 'testid2', 'testid1'];
    const spy = jest.spyOn(API, 'orderBurgerApi');
    const res = await API.orderBurgerApi(burger);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test orderBurgerApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    const burger = ['testid1', 'testid2', 'testid1'];
    await API.orderBurgerApi(burger).catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  test('Test getOrdersApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getOrdersApi');
    const res = await API.getOrdersApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData.orders);
  });

  test('Test getOrdersApi fail jwt', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.getOrdersApi().catch((err) => expect(err).toEqual(mockError));
  });

  test('Test getOrdersApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.getOrdersApi().catch((err) => expect(err).toEqual(mockError));
  });

  test('Test getFeedsApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getFeedsApi');
    const res = await API.getFeedsApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test getFeedsApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.getFeedsApi().catch((err) => expect(err).toEqual(mockError));
  });

  test('Test getIngredientsApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'getIngredientsApi');
    const res = await API.getIngredientsApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData.data);
  });

  test('Test getIngredientsApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.getIngredientsApi().catch((err) =>
      expect(err).toEqual(mockError)
    );
  });

  test('Test refreshTokenApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;
    const spy = jest.spyOn(API, 'refreshToken');
    const res = await API.refreshToken();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('Test refreshTokenApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError)) as any;
    await API.refreshToken().catch((err) => expect(err).toEqual(mockError));
  });

  test('Test refreshTokenApi fail ok=false', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockError, false)) as any;
    await API.refreshToken().catch((err) => expect(err).toEqual(mockError));
  });
});
