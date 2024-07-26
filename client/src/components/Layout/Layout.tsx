import { Outlet } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.scss';
import { Footer } from '../Footer/Footer';
export const Layout = () => {
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
