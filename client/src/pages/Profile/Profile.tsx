import { ChangeEvent, useContext, useRef } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Profile.module.scss';
import { PiUserLight } from 'react-icons/pi';
import { ProfileEditForm } from '../../components/Forms/ProfileEditForm/ProfileEditForm';
import { DataContext } from '../../contexts/DataContext';

export const Profile = () => {
  const {
    user,
    activeEditForm,
    setActiveEditForm,
    setFirstNameEditProfileFormValue,
    setLastNameEditProfileFormValue,
    setAgeEditProfileFormValue,
  } = useContext(AuthContext);
  const { setEditProfileFormMaritalStatusValue } = useContext(DataContext);

  const selectedProfileImage = useRef<File | null>(null);

  const activateEditProfileFormHandler = () => {
    setActiveEditForm(true);
    setFirstNameEditProfileFormValue(user!.firstName);
    setLastNameEditProfileFormValue(user!.lastName);
    setAgeEditProfileFormValue(user!.age ? user!.age : 'confidential');
    setEditProfileFormMaritalStatusValue('Marital-status');
  };

  const changeProfileImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files);
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      selectedProfileImage.current = e.currentTarget.files[0];
      console.log('Profile image is being updated');
    }
  };
  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.main_profie_box}>
      <div className={styles.profile_box}>
        <div className={styles.main_profile_image_box}>
          <div className={styles.profile_image_box}>
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="profile-image"
                className={styles.profile_image}
              />
            ) : (
              <PiUserLight className={styles.user_icon} />
            )}
          </div>
          <div className={styles.upload_image_input_box}>
            <label
              htmlFor="image-input"
              className={styles.profile_image_button}
            >
              change image
            </label>
            <input
              type="file"
              id="image-input"
              className={styles.profile_image_input}
              title="chnage image"
              onChange={changeProfileImageHandler}
            />
          </div>
        </div>
        {activeEditForm ? (
          <ProfileEditForm />
        ) : (
          <div className={styles.main_profile_details_box}>
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
                  {user.age ? user.age : 'confidential'}
                </span>
              </h3>
              <h3 className={styles.detail_header}>
                Marital-status:
                <span className={styles.detail_span}>
                  {user.maritalStatus ? user.maritalStatus : 'confidential'}
                </span>
              </h3>
            </div>
            <div className={styles.edit_profile_button_box}>
              <div
                className={styles.edit_profile_button}
                onClick={activateEditProfileFormHandler}
              >
                edit profile
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
