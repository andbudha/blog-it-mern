import { useContext } from 'react';
import styles from './MyBlogs.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router';

export const MyBlogs = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.main_myblogs_box}>
      <h1>My Blogs</h1>
    </div>
  );
};
