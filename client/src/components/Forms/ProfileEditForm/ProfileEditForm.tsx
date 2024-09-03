import { ChangeEvent, useContext, useState } from 'react';
import styles from './ProfileEditForm.module.scss';
import { DataContext } from '../../../contexts/DataContext';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { CommonEditProfileFormValues } from '../../../types/common_types';
import { AuthContext } from '../../../contexts/AuthContext';

export const ProfileEditForm = () => {
  const [firstNameInputError, setFirstNameInputError] =
    useState<boolean>(false);
  const [lastNameInputError, setLastNameInputError] = useState<boolean>(false);
  const [ageInputError, setAgeInputError] = useState<boolean>(false);
  const { customSelectStatus, setCustomSelectStatus } = useContext(DataContext);
  const {
    user,
    firstNameEditProfileFormValue,
    lastNameEditProfileFormValue,
    ageEditProfileFormValue,
    editProfileFormMaritalStatusValue,
    updateProfileDetails,
    setActiveEditForm,
    setFirstNameEditProfileFormValue,
    setLastNameEditProfileFormValue,
    setAgeEditProfileFormValue,
    setEditProfileFormMaritalStatusValue,
  } = useContext(AuthContext);

  const editProdileFormValues: CommonEditProfileFormValues = {
    firstName: firstNameEditProfileFormValue,
    lastName: lastNameEditProfileFormValue,
    age: ageEditProfileFormValue,
    maritalStatus: editProfileFormMaritalStatusValue,
  };

  const validate = (values: CommonEditProfileFormValues) => {
    const errors: CommonEditProfileFormValues = {
      firstName: '',
      lastName: '',
      age: '',
    };

    if (!values.firstName) {
      errors.firstName = 'First-name is required!';
    }
    if (!values.lastName) {
      errors.lastName = 'Last-name is required!';
    }
    if (!values.age) {
      errors.age = 'Age is required!';
    } else if (parseInt(values.age) < 18) {
      errors.age = 'Must be 18+!';
    } else if (parseInt(values.age) > 99) {
      errors.age = 'Are you in earnest?';
    }

    return errors;
  };

  const validation = validate(editProdileFormValues);
  const toggleCustomSelectHandler = () => {
    setCustomSelectStatus(!customSelectStatus);
  };

  const changeMaritalStatusHandler = (newMaritalStatus: string) => {
    setEditProfileFormMaritalStatusValue(newMaritalStatus);
    setCustomSelectStatus(false);
  };

  const editProfileFirstNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstNameEditProfileFormValue(e.currentTarget.value);
    if (validation.firstName.length === 0) {
      setFirstNameInputError(true);
    }
  };
  const editProfileLastNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLastNameEditProfileFormValue(e.currentTarget.value);
    if (validation.lastName.length === 0) {
      setLastNameInputError(true);
    }
  };
  const editProfileAgeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeEditProfileFormValue(e.currentTarget.value);
    const age = e.currentTarget.value;
    console.log(typeof age);

    if (validation.age.length === 0) {
      setAgeInputError(true);
    }
  };

  const saveProfileChangesHandler = () => {
    const profileUpdates = {
      userID: user?.userID,
      ...editProdileFormValues,
    };
    if (!validation.firstName && !validation.lastName && !validation.age) {
      setFirstNameInputError(false);
      setLastNameInputError(false);
      setAgeInputError(false);
      updateProfileDetails(profileUpdates);
    }
  };

  const discardChangesHandler = () => {
    setActiveEditForm(false);
  };

  return (
    <div className={styles.main_profile_edit_form_box}>
      <div className={styles.edit_form_box}>
        <div className={styles.edit_profile_input_box}>
          {firstNameInputError && validation.firstName ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.firstName}</span>
            </div>
          ) : (
            <label className={styles.label}>First-name</label>
          )}
          <input
            value={firstNameEditProfileFormValue}
            onChange={editProfileFirstNameHandler}
            type="text"
            placeholder="your first-name..."
            className={styles.edit_profile_input}
          />
        </div>
        <div className={styles.edit_profile_input_box}>
          {lastNameInputError && validation.lastName ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.lastName}</span>
            </div>
          ) : (
            <label className={styles.label}>Last-name</label>
          )}
          <input
            value={lastNameEditProfileFormValue}
            onChange={editProfileLastNameHandler}
            type="text"
            placeholder="your last-tname..."
            className={styles.edit_profile_input}
          />
        </div>
        <div className={styles.edit_profile_input_box}>
          {ageInputError && validation.age ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.age}</span>
            </div>
          ) : (
            <label className={styles.label}>Age</label>
          )}
          <input
            value={ageEditProfileFormValue}
            onChange={editProfileAgeNameHandler}
            type="number"
            min={0}
            placeholder="your age..."
            className={styles.edit_profile_input}
          />
        </div>
        <div
          className={`${styles.edit_profile_custom_select} ${
            customSelectStatus && styles.active_edit_profile_custom_select
          }`}
        >
          <div className={styles.edit_profile_custom_select_label_box}>
            <label className={styles.label}>Marital-status</label>
          </div>
          <div
            className={styles.default_select_value_box}
            onClick={toggleCustomSelectHandler}
          >
            {editProfileFormMaritalStatusValue}
            {customSelectStatus ? (
              <TbChevronUp className={styles.chevron_icon} />
            ) : (
              <TbChevronDown className={styles.chevron_icon} />
            )}
          </div>
          {customSelectStatus && (
            <div className={styles.select_option_box}>
              <div
                className={styles.select_option}
                onClick={() => changeMaritalStatusHandler('single')}
              >
                single
              </div>
              <div
                className={styles.select_option}
                onClick={() => changeMaritalStatusHandler('married')}
              >
                married
              </div>
              <div
                className={styles.select_option}
                onClick={() => changeMaritalStatusHandler('confidential')}
              >
                confidential
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.edit_form_button_box}>
        <div
          className={styles.save_changes_button}
          onClick={saveProfileChangesHandler}
        >
          save
        </div>
        <div
          className={styles.discard_changes_button}
          onClick={discardChangesHandler}
        >
          discard
        </div>
      </div>
    </div>
  );
};
