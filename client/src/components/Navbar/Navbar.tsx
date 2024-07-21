import { useState } from 'react';
import styles from './Navbar.module.scss';
import { TbEdit } from 'react-icons/tb';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [user, setUser] = useState<boolean>(false);
  const path = useLocation();

  return (
    <div className={styles.main_navbar_box}>
      <Link className={styles.main_logo_box} to={'/'}>
        <TbEdit className={styles.pen_icon} />
        <h3 className={styles.logo}>blog_it</h3>
      </Link>
      <div className={styles.main_navbar_link_box}>
        {user ? (
          <div className={styles.active_user_link_box}>
            <NavLink
              className={`${styles.link_box} ${
                path.pathname === '/myblogs' && styles.active_link
              }`}
              to={'/myblogs'}
            >
              <h3 className={styles.link_text}>my-blogs</h3>
            </NavLink>
            <NavLink
              className={`${styles.link_box} ${
                path.pathname === '/myfavorites' && styles.active_link
              }`}
              to={'/myfavorites'}
            >
              <h3 className={styles.link_text}>my-favorites</h3>
            </NavLink>

            <NavLink
              className={`${styles.link_box} ${
                path.pathname === '/profile' && styles.active_link
              }`}
              to={'/profile'}
            >
              <h3 className={styles.link_text}>profile</h3>
            </NavLink>
            <div className={styles.link_box}>
              <h3 className={`${styles.link_text} ${styles.logout_button}`}>
                logout
              </h3>
            </div>
          </div>
        ) : (
          <div className={styles.inactive_user_link_box}>
            <NavLink
              className={`${styles.link_box} ${
                path.pathname === '/login' && styles.active_link
              }`}
              to={'login'}
            >
              <h3 className={styles.link_text}>login</h3>
            </NavLink>
            <NavLink
              className={`${styles.link_box} ${
                path.pathname === '/signup' && styles.active_link
              }`}
              to={'signup'}
            >
              <h3 className={styles.link_text}>signup</h3>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
