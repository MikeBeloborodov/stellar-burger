import { FC } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { fetchLogout } from '../../slices/stellarBurgerSlice';
import { useAppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout());
    redirect('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
