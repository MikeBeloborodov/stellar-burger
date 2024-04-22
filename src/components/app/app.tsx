import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import {
  fetchFeed,
  fetchIngredients,
  getUserThunk,
  init
} from '../../slices/stellarBurgerSlice';

import {
  AppHeader,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { getCookie } from '../../utils/cookie';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');

    if (token) {
      dispatch(getUserThunk()).then(() => dispatch(init()));
    } else {
      dispatch(init());
    }
  });

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuthOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuthOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route // TODO MODAL
          path='/feed/:number'
          element={<OrderInfo />}
        />
        <Route // TODO: modal
          path='/ingredients/:id'
          element={<IngredientDetails />}
        />
        <Route // TODO: modal
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
