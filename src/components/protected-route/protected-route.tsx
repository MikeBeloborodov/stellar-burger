import { selectIsAuthChecked } from '../../slices/stellarBurgerSlice';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  return children;
};
