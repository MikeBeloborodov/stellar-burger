import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import {
  selectOrderRequest,
  selectConstructorItems,
  selectOrderModalData,
  fetchNewOrder,
  closeOrderRequest
} from '../../slices/stellarBurgerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orderRequest = useSelector(selectOrderRequest);
  const constructorItems = useSelector(selectConstructorItems);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      dispatch(
        fetchNewOrder([
          constructorItems?.bun?._id,
          ...constructorItems.ingredients.map((item) => item._id),
          constructorItems.bun._id
        ])
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
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
