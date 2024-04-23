import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchIngredients,
  fetchUserOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/stellarBurgerSlice';
import { Preloader } from '@ui';
import { useAppSelector, useAppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
  }, []);
  const orders = useAppSelector(selectUserOrders);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
