import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './MyFavorites.module.scss';

export const MyFavorites = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.main_myfavorites_box}>
      <h1>My Favorites Page</h1>
    </div>
  );
};
