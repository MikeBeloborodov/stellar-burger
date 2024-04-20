import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../slices/stellarBurgerSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  <h1>UI</h1>;

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
