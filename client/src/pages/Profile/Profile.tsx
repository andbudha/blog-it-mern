import { ChangeEvent, useContext, useRef } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Profile.module.scss';
import { PiUserLight } from 'react-icons/pi';
import { ProfileEditForm } from '../../components/Forms/ProfileEditForm/ProfileEditForm';
import { AuthLoader } from '../../components/Loaders/AuthLoader/AuthLoader';

export const Profile = () => {
  const {
    user,
    activeEditForm,
    authLoaderStatus,
    updateProfileImageButtonStatus,
    setAuthLoaderStatus,
    setEditProfileFormMaritalStatusValue,
    setActiveEditForm,
    setFirstNameEditProfileFormValue,
    setLastNameEditProfileFormValue,
    setAgeEditProfileFormValue,
    setUpdateProfileImageButtonStatus,
    uploadProfileImage,
  } = useContext(AuthContext);
  const selectedProfileImage = useRef<File | null>(null);
  const activateEditProfileFormHandler = () => {
    setActiveEditForm(true);
    setFirstNameEditProfileFormValue(user!.firstName);
    setLastNameEditProfileFormValue(user!.lastName);
    setAgeEditProfileFormValue(user!.age ? user!.age : 'confidential');
    setEditProfileFormMaritalStatusValue('confidential');
  };
  const changeProfileImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthLoaderStatus('uploading-profile-image');
    setUpdateProfileImageButtonStatus(true);
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      selectedProfileImage.current = e.currentTarget.files[0];
    }
  };
  const saveNewProfileImageHandler = () => {
    const profileImageUpdateBody = new FormData();
    if (user) {
      profileImageUpdateBody.append('userID', user._id);
      profileImageUpdateBody.append(
        'avatarPublicID',
        user.profileImagePublicID
      );
    }
    if (selectedProfileImage.current) {
      profileImageUpdateBody.append(
        'profileImage',
        selectedProfileImage.current
      );
    }
    setAuthLoaderStatus('loading-profile');
    uploadProfileImage(profileImageUpdateBody);
  };
  const discardNewProfileImageHandler = () => {
    setUpdateProfileImageButtonStatus(false);
    setAuthLoaderStatus('idle');
  };
  if (!user) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={styles.main_profie_box}>
      {authLoaderStatus === 'loading-profile' ? (
        <AuthLoader />
      ) : (
        <div className={styles.profile_box}>
          <div className={styles.main_profile_image_box}>
            <div className={styles.profile_image_box}>
              {authLoaderStatus === 'uploading-profile-image' ? (
                <>
                  <h3 className={styles.save_selected_image}>
                    Save selected image?
                  </h3>
                  <AuthLoader />
                </>
              ) : (
                <>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="profile-image"
                      className={styles.profile_image}
                    />
                  ) : (
                    <PiUserLight className={styles.user_icon} />
                  )}
                </>
              )}
            </div>
            {updateProfileImageButtonStatus ? (
              <div className={styles.edit_form_button_box}>
                <div
                  className={styles.save_changes_button}
                  onClick={saveNewProfileImageHandler}
                >
                  save
                </div>
                <div
                  className={styles.discard_changes_button}
                  onClick={discardNewProfileImageHandler}
                >
                  discard
                </div>
              </div>
            ) : (
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
            )}
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
      )}
    </div>
  );
};
