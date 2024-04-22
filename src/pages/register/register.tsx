import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  fetchRegisterUser,
  selectErrorText,
  selectLoading
} from '../../slices/stellarBurgerSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useAppSelector, useAppDispatch } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const errorText = useAppSelector(selectErrorText);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useAppSelector(selectLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ email, password, name: userName })).then(
      (response: any) => {
        if (response.payload.success) {
          return navigate('/login');
        }
      }
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
