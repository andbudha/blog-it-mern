import { useContext } from 'react';
import styles from './BurgerMenu.module.scss';
import { AuthContext } from '../../../contexts/AuthContext';
import { IoMdClose } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';

export const BurgerMenu = () => {
  const { user, burgerMenuStatus, setBurgerMenuStatus, logUserOut } =
    useContext(AuthContext);
  const path = useLocation();

  const toggleBurgerMenuHandler = () => {
    setBurgerMenuStatus(false);
  };
  const logoutHandler = () => {
    logUserOut();
    setBurgerMenuStatus(false);
  };
  return (
    <div
      className={`${styles.active_burger_menu} ${
        !burgerMenuStatus && styles.inactive_burger_menu
      }`}
    >
      <div className={styles.main_links_box}>
        <div className={styles.close_burger_menu_icon_box}>
          <IoMdClose
            className={styles.close_burger_menu_icon}
            onClick={toggleBurgerMenuHandler}
          />
        </div>
        <div className={styles.links_box}>
          {user ? (
            <>
              {' '}
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/' && styles.active_link
                }`}
                to={'/'}
                onClick={toggleBurgerMenuHandler}
              >
                <h3 className={styles.link_text}>main</h3>
              </NavLink>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/myblogs' && styles.active_link
                }`}
                to={'/myblogs'}
                onClick={toggleBurgerMenuHandler}
              >
                <h3 className={styles.link_text}>my-blogs</h3>
              </NavLink>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/myfavorites' && styles.active_link
                }`}
                to={'/myfavorites'}
                onClick={toggleBurgerMenuHandler}
              >
                <h3 className={styles.link_text}>my-favorites</h3>
              </NavLink>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/profile' && styles.active_link
                }`}
                to={'/profile'}
                onClick={toggleBurgerMenuHandler}
              >
                <h3 className={styles.link_text}>profile</h3>
              </NavLink>
              <div className={styles.link_box} onClick={logoutHandler}>
                <h3 className={`${styles.link_text} ${styles.logout_button}`}>
                  logout
                </h3>
              </div>
            </>
          ) : (
            <>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/login' && styles.active_link
                }`}
                to={'login'}
                onClick={toggleBurgerMenuHandler}
              >
                <h3 className={styles.link_text}>login</h3>
              </NavLink>
              <NavLink
                className={`${styles.link_box} ${
                  path.pathname === '/signup' && styles.active_link
                }`}
                to={'signup'}
                onClick={toggleBurgerMenuHandler}
              >
                <h3 className={styles.link_text}>signup</h3>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
