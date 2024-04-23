import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchLoginUser, selectLoading } from '../../slices/stellarBurgerSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';
import {
  selectErrorText,
  removeErrorText
} from '../../slices/stellarBurgerSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const error = useAppSelector(selectErrorText);
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(removeErrorText());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(removeErrorText());
    dispatch(fetchLoginUser(values));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={values.email}
      setEmail={handleChange}
      password={values.password}
      setPassword={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
