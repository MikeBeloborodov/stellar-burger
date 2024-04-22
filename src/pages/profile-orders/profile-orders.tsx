import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import {
  fetchIngredients,
  fetchUserOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/stellarBurgerSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
  }, []);
  const orders: TOrder[] = useSelector(selectUserOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
