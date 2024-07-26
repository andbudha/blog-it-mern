import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Profile.module.scss';

export const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.main_profie_box}>
      <h1>Profile Page</h1>
    </div>
  );
};
