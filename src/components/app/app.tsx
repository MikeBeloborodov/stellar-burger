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
import { getCookie } from '../../utils/cookie';
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

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');
    dispatch(fetchFeed());
    dispatch(fetchIngredients());
    if (token) {
      dispatch(getUserThunk());
    } else {
      dispatch(init());
    }
  }, []);

  return (
    <Routes>
      <Route
        path='*'
        element={
          <div className={styles.app}>
            <AppHeader />
            <NotFound404 />
          </div>
        }
      />
      <Route
        path='/'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ConstructorPage />
          </div>
        }
      />
      <Route
        path='/feed'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Feed />
          </div>
        }
      />
      <Route // TODO: protect
        path='/login'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Login />
          </div>
        }
      />
      <Route // TODO: protect
        path='/register'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Register />
          </div>
        }
      />
      <Route // TODO: protect
        path='/forgot-password'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ForgotPassword />
          </div>
        }
      />
      <Route // TODO: protect
        path='/reset-password'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ResetPassword />
          </div>
        }
      />
      <Route // TODO: protect
        path='/profile'
        element={
          <ProtectedRoute>
            <div className={styles.app}>
              <AppHeader />
              <Profile />
            </div>
          </ProtectedRoute>
        }
      />
      <Route // TODO: protect
        path='/profile/orders'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ProfileOrders />
          </div>
        }
      />
      <Route // TODO: modal
        path='/feed/:number'
        element={
          <div className={styles.app}>
            <AppHeader />
            <OrderInfo />
          </div>
        }
      />
      <Route // TODO: modal
        path='/ingredients/:id'
        element={
          <div className={styles.app}>
            <AppHeader />
            <IngredientDetails />
          </div>
        }
      />
      <Route // TODO: modal, protect
        path='/profile/orders/:number'
        element={
          <div className={styles.app}>
            <AppHeader />
            <OrderInfo />
          </div>
        }
      />
    </Routes>
  );
};
