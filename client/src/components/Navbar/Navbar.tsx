import { useState } from 'react';
import styles from './Navbar.module.scss';
import { TbEdit } from 'react-icons/tb';

export const Navbar = () => {
  const [user, setUser] = useState<boolean>(false);
  return (
    <div className={styles.main_navbar_box}>
      <div className={styles.main_logo_box}>
        <TbEdit className={styles.pen_icon} />
        <h3 className={styles.logo}>blog it</h3>
      </div>
      <div className={styles.main_navbar_link_box}>
        {user ? (
          <div className={styles.active_user_link_box}>
            <div className={styles.link_box}>
              <h3 className={styles.link_text}>my-blogs</h3>
            </div>
            <div className={styles.link_box}>
              <h3 className={styles.link_text}>my-favorites</h3>
            </div>

            <div className={styles.link_box}>
              <h3 className={styles.link_text}>profile</h3>
            </div>
            <div className={styles.link_box}>
              <h3 className={styles.link_text}>logout</h3>
            </div>
          </div>
        ) : (
          <div className={styles.inactive_user_link_box}>
            <div className={styles.link_box}>
              <h3 className={styles.link_text}>signup</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
