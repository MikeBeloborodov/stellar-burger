import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrders,
  fetchFeed,
  removeOrders
} from '../../slices/stellarBurgerSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch: AppDispatch = useDispatch();

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
