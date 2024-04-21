import { FC } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../slices/stellarBurgerSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
    redirect('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
