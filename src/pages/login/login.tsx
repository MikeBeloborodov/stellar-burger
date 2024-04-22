import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchLoginUser, getUserThunk } from '../../slices/stellarBurgerSlice';
import { selectErrorText } from '../../slices/stellarBurgerSlice';
import { useAppSelector, useAppDispatch } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const errorText = useAppSelector(selectErrorText);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password })).then(() =>
      dispatch(getUserThunk())
    );
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
