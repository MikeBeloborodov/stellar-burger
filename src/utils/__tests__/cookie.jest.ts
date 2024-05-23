import { expect, test, describe, jest } from '@jest/globals';
import * as Utils from '../cookie';

describe('Cookie tests', () => {
  test('Test setCookie', () => {
    global.document = { cookie: '' } as any;
    const spy = jest.spyOn(Utils, 'setCookie');

    Utils.setCookie('test_name', 'test_val');

    expect(spy).toHaveBeenCalledWith('test_name', 'test_val');
    expect(document.cookie).toMatch(/test_name=test_val/g);
  });

  test('Test getCookie', () => {
    global.document = { cookie: 'test_name=test_val' } as any;
    const spy = jest.spyOn(Utils, 'getCookie');

    const res = Utils.getCookie('test_name');
    const res2 = Utils.getCookie('test_name_2');

    expect(spy).toHaveBeenCalledWith('test_name');
    expect(spy).toHaveBeenCalledWith('test_name_2');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(res).toBe('test_val');
    expect(res2).toBe(undefined);
  });

  test('Test deleteCookie', () => {
    global.document = { cookie: 'test_name=test_val' } as any;
    const spy = jest.spyOn(Utils, 'deleteCookie');

    Utils.deleteCookie('test_name');

    expect(spy).toHaveBeenCalledWith('test_name');
    expect(document.cookie).toMatch(/test_name=;/g);
  });
});
