import { Outlet } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.scss';
import { Footer } from '../Footer/Footer';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { BurgerMenu } from '../Navbar/BurgerMenu/BurgerMenu';
import { DataContext } from '../../contexts/DataContext';
export const Layout = () => {
  const { getUserProfile, getUsers } = useContext(AuthContext);
  const { fetchBlogs } = useContext(DataContext);

  useEffect(() => {
    getUserProfile();
    fetchBlogs();
    getUsers();
  }, []);
  return (
    <div className={styles.main_layout_box}>
      <BurgerMenu />
      <Navbar />
      <div className={styles.main_outlet_box}>
        {' '}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
