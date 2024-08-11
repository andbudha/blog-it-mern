import { NavLink } from 'react-router-dom';
import styles from './InfoPage.module.scss';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

export const InfoPage = () => {
  const { setInformStatus } = useContext(DataContext);
  const setInformStatusHandler = () => {
    setInformStatus(false);
  };
  return (
    <div className={styles.main_info_page_box}>
      <h2 className={styles.info_text}>Blog Successfully Deleted</h2>
      <NavLink
        className={styles.my_blogs_button}
        to={'/myblogs'}
        onClick={setInformStatusHandler}
      >
        my blogs
      </NavLink>
    </div>
  );
};
