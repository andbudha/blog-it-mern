import { Outlet } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.scss';
import { Footer } from '../Footer/Footer';
import { useEffect } from 'react';
import { getToken } from '../../assets/utils/tokenServices';
export const Layout = () => {
  useEffect(() => {
    const userIsLoggedIn = getToken();
    if (userIsLoggedIn) {
      console.log('%cThe user is logged in!', 'color: yellow');
    } else {
      console.log('%cThe user is not logged in!', 'color: coral');
    }
  }, []);
  return (
    <div className={styles.main_layout_box}>
      <Navbar />
      <div className={styles.main_outlet_box}>
        {' '}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
