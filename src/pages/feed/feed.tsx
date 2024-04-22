import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrders,
  fetchFeed,
  removeOrders,
  fetchIngredients
} from '../../slices/stellarBurgerSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(removeOrders());
        dispatch(fetchFeed());
      }}
    />
  );
};
