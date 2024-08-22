import { useContext } from 'react';
import styles from './Navbar.module.scss';
import { TbEdit } from 'react-icons/tb';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { DataLoader } from '../Loaders/DataLoader/DataLoader';
import { DataContext } from '../../contexts/DataContext';
import { GiHamburgerMenu } from 'react-icons/gi';

export const Navbar = () => {
  const { user, burgerMenuStatus, logUserOut, setBurgerMenuStatus } =
    useContext(AuthContext);
  const { dataLoaderStatus } = useContext(DataContext);
  const path = useLocation();
  const time = new Date().getHours();

  const greeting = () => {
    if (time < 6 || time === 0) {
      return `Hello, ${user?.firstName}.`;
    } else if (time < 12 || time === 6) {
      return `Good morning, ${user?.firstName}.`;
    } else if (time < 18 || time === 12) {
      return `Good afternoon, ${user?.firstName}.`;
    } else if (time < 24 || time === 18) {
      return `Good evening, ${user?.firstName}.`;
    }
  };

  const logoutHandler = () => {
    logUserOut();
  };

  const showBurgerMenuHandler = () => {
    setBurgerMenuStatus(!burgerMenuStatus);
  };

  return (
    <div className={styles.main_navbar_box}>
      <div className={styles.main_navbar_link_box}>
        <Link className={styles.main_logo_box} to={'/'}>
          <TbEdit className={styles.pen_icon} />
          <h3 className={styles.logo}>blog_it</h3>
        </Link>
        <div className={styles.navbar_link_box}>
          {user ? (
            <div className={styles.active_user_link_box}>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/myblogs' && styles.active_link
                }`}
                to={'/myblogs'}
              >
                <h3 className={styles.link_text}>my_blogs</h3>
              </NavLink>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/myfavorites' && styles.active_link
                }`}
                to={'/myfavorites'}
              >
                <h3 className={styles.link_text}>my_favorites</h3>
              </NavLink>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/profile' && styles.active_link
                }`}
                to={'/profile'}
              >
                <h3 className={styles.link_text}>profile</h3>
              </NavLink>
              <div className={styles.link_box} onClick={logoutHandler}>
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
        {!burgerMenuStatus && (
          <GiHamburgerMenu
            className={styles.burger_menu_icon}
            onClick={showBurgerMenuHandler}
          />
        )}
      </div>
      <div className={styles.main_greeting_box}>{user && greeting()}</div>
      {dataLoaderStatus ? (
        <DataLoader />
      ) : (
        <div className={styles.secondary_loader_placeholder}></div>
      )}
    </div>
  );
};
