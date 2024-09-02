import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Profile.module.scss';
import { PiUserLight } from 'react-icons/pi';
import { ProfileEditForm } from '../../components/Forms/ProfileEditForm/ProfileEditForm';
import { AuthLoader } from '../../components/Loaders/AuthLoader/AuthLoader';
import { useLocation } from 'react-router';

export const Profile = () => {
  const [temporaryImageUrl, setTemporaryImageUrl] = useState<string>('');
  const { pathname } = useLocation();
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveEditForm(false);
  }, [pathname]);

  const activateEditProfileFormHandler = () => {
    setActiveEditForm(true);
    setFirstNameEditProfileFormValue(user!.firstName);
    setLastNameEditProfileFormValue(user!.lastName);
    setAgeEditProfileFormValue(user!.age ? user!.age : 'confidential');
    setEditProfileFormMaritalStatusValue(user?.maritalStatus || 'confidential');
  };
  const changeProfileImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthLoaderStatus('uploading-profile-image');
    setUpdateProfileImageButtonStatus(true);
    if (temporaryImageUrl) {
      URL.revokeObjectURL(temporaryImageUrl);
    }
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      selectedProfileImage.current = e.currentTarget.files[0];
      const url = URL.createObjectURL(e.currentTarget.files[0]);
      setTemporaryImageUrl(url);
    } else {
      if (temporaryImageUrl) {
        URL.revokeObjectURL(temporaryImageUrl);
      }
    }
  };
  const saveNewProfileImageHandler = () => {
    const profileImageUpdateBody = new FormData();
    if (user) {
      profileImageUpdateBody.append('userID', user.userID);
      profileImageUpdateBody.append(
        'profileImagePublicID',
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
    setTemporaryImageUrl('');
  };
  const discardNewProfileImageHandler = () => {
    setUpdateProfileImageButtonStatus(false);
    setTemporaryImageUrl('');
  };

  return (
    <div className={styles.main_profie_box}>
      {authLoaderStatus === 'loading-profile' ? (
        <AuthLoader />
      ) : (
        <div className={styles.profile_box}>
          <div className={styles.main_profile_image_box}>
            <div className={styles.profile_image_box}>
              {temporaryImageUrl ? (
                <img
                  src={temporaryImageUrl}
                  alt="temporary profile image"
                  className={styles.profile_image}
                />
              ) : (
                <>
                  {user?.profileImage ? (
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
                  title="change image"
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
                  <span className={styles.detail_span}>{user!.firstName}</span>
                </h3>
                <h3 className={styles.detail_header}>
                  Last-name:
                  <span className={styles.detail_span}>{user?.lastName}</span>
                </h3>
                <h3 className={styles.detail_header}>
                  Age:
                  <span className={styles.detail_span}>
                    {user?.age ? user.age : 'confidential'}
                  </span>
                </h3>
                <h3 className={styles.detail_header}>
                  Marital-status:
                  <span className={styles.detail_span}>
                    {user?.maritalStatus ? user.maritalStatus : 'confidential'}
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
