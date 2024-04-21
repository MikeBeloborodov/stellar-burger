import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  selectOrders,
  selectTodayOrders,
  selectTotalOrders
} from '../../slices/stellarBurgerSlice';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const total = useSelector(selectTotalOrders);
  const totalToday = useSelector(selectTodayOrders);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
