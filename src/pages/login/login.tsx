import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { fetchLoginUser, getUserThunk } from '../../slices/stellarBurgerSlice';
import { AppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { selectErrorText } from '../../slices/stellarBurgerSlice';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const errorText = useSelector(selectErrorText);

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
