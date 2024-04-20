import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectOrderRequest,
  selectConstructorItems,
  selectOrderModalData,
  makeOrderRequest,
  fetchNewOrder
} from '../../slices/stellarBurgerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orderRequest = useSelector(selectOrderRequest);
  const constructorItems = useSelector(selectConstructorItems);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (
      constructorItems.bun.price === 0 ||
      constructorItems.ingredients.length === 0
    )
      return;
    dispatch(fetchNewOrder(['abc']));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
