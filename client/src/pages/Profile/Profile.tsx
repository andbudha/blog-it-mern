import { useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Profile.module.scss';
import { PiUserLight } from 'react-icons/pi';

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeEditForm, setActiveEditForm] = useState<boolean>(false);

  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.main_profie_box}>
      <div className={styles.profile_box}>
        <div className={styles.profile_image_box}>
          <PiUserLight className={styles.user_icon} />
        </div>
        <div className={styles.profile_details_box}>
          <h3 className={styles.detail_header}>
            First-name:{' '}
            <span className={styles.detail_span}>{user.firstName}</span>
          </h3>
          <h3 className={styles.detail_header}>
            Last-name:
            <span className={styles.detail_span}>{user.lastName}</span>
          </h3>
          <h3 className={styles.detail_header}>
            Age:
            <span className={styles.detail_span}>
              {user.age ? user.age : 'uknown'}
            </span>
          </h3>
          <h3 className={styles.detail_header}>
            Marital-status:
            <span className={styles.detail_span}>
              {user.maritalStatus ? user.maritalStatus : 'uknown'}
            </span>
          </h3>
        </div>
      </div>
      <div className={styles.edit_profile_button_box}>
        <div className={styles.edit_profile_button}>edit</div>
      </div>
    </div>
  );
};
