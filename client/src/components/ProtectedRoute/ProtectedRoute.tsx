import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router';
type ProtectedRouteProps = {
  children: ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  return <>{user ? children : <Navigate to={'/'} />}</>;
};
