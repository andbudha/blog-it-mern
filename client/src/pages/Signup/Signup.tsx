import { NavLink } from 'react-router-dom';
import styles from './Signup.module.scss';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { CommonSignupValues } from '../../types/common_types';
import { AuthLoader } from '../../components/Loaders/AuthLoader/AuthLoader';

export const Signup = () => {
  const [signupEmailInputError, setSignupEmailInputError] =
    useState<boolean>(false);
  const [signupPasswordInputError, setSignupPasswordInputError] =
    useState<boolean>(false);
  const [signupFirstNameInputError, setSignupFirstNameInputError] =
    useState<boolean>(false);
  const [signupSecondNameInputError, setSignupSecondNameInputError] =
    useState<boolean>(false);
  const {
    signupEmailValue,
    signupFirstNameValue,
    signupSecondNameValue,
    signupPasswordValue,
    authLoaderStatus,
    setSignupEmailValue,
    setSignupFirstNameValue,
    setSignupSecondNameValue,
    setSignupPasswordValue,
    registerUser,
  } = useContext(AuthContext);

  const signupValues: CommonSignupValues = {
    email: signupEmailValue,
    firstName: signupFirstNameValue,
    secondName: signupSecondNameValue,
    password: signupPasswordValue,
  };

  const validate = (values: CommonSignupValues) => {
    const errors: CommonSignupValues = {
      email: '',
      firstName: '',
      secondName: '',
      password: '',
    };
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Must be at least 6 characters';
    }
    if (!values.firstName) {
      errors.firstName = 'Firstname is required!';
    } else if (values.firstName.length < 1) {
      errors.firstName = 'Must be at least 1 character';
    }
    if (!values.secondName) {
      errors.secondName = 'Firstname is required!';
    } else if (values.secondName.length < 1) {
      errors.secondName = 'Must be at least 1 character';
    }
    return errors;
  };

  const validation = validate(signupValues);

  const catchSignupEmailValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupEmailValue(e.currentTarget.value);
    if (validation.email.length > 0) {
      setSignupEmailInputError(true);
    }
  };

  const catchSignupFirstNameValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupFirstNameValue(e.currentTarget.value);
    if (validation.firstName.length > 0) {
      setSignupFirstNameInputError(true);
    }
  };
  const catchSignupSecondNameValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupSecondNameValue(e.currentTarget.value);
    if (validation.secondName.length > 0) {
      setSignupSecondNameInputError(true);
    }
  };

  const catchPasswordValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupPasswordValue(e.currentTarget.value);
    if (validation.password.length > 0) {
      setSignupPasswordInputError(true);
    }
  };

  const submitSignupFormValuesHandler = () => {
    if (
      validation.email &&
      validation.password &&
      validation.firstName &&
      validation.secondName
    ) {
      setSignupEmailInputError(true);
      setSignupPasswordInputError(true);
      setSignupFirstNameInputError(true);
      setSignupSecondNameInputError(true);
    } else if (validation.email) {
      setSignupEmailInputError(true);
    } else if (validation.password) {
      setSignupPasswordInputError(true);
    } else if (validation.firstName) {
      setSignupFirstNameInputError(true);
    } else if (validation.secondName) {
      setSignupSecondNameInputError(true);
    } else if (
      !validation.email &&
      !validation.password &&
      !validation.firstName &&
      !validation.secondName
    ) {
      registerUser(signupValues);
      setSignupEmailInputError(false);
      setSignupPasswordInputError(false);
      setSignupFirstNameInputError(false);
      setSignupSecondNameInputError(false);
    }
  };
  return (
    <div className={styles.main_signup_box}>
      <div className={styles.signup_box}>
        {authLoaderStatus === 'registering' && <AuthLoader />}
        <form className={styles.main_form_box}>
          <div className={styles.input_box}>
            {signupEmailInputError && validation.email ? (
              <div className={styles.error_text_box}>
                <span className={styles.error_text}>{validation.email}</span>
              </div>
            ) : (
              <label className={styles.label}>Email:</label>
            )}
            <input
              value={signupEmailValue}
              type="text"
              className={styles.input}
              placeholder="your email..."
              onChange={catchSignupEmailValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            {signupFirstNameInputError && validation.firstName ? (
              <div className={styles.error_text_box}>
                <span className={styles.error_text}>
                  {validation.firstName}
                </span>
              </div>
            ) : (
              <label className={styles.label}>First-name:</label>
            )}
            <input
              value={signupFirstNameValue}
              type="text"
              className={styles.input}
              placeholder="your first-name..."
              onChange={catchSignupFirstNameValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            {signupSecondNameInputError && validation.secondName ? (
              <div className={styles.error_text_box}>
                <span className={styles.error_text}>
                  {validation.secondName}
                </span>
              </div>
            ) : (
              <label className={styles.label}>Second-name:</label>
            )}
            <input
              value={signupSecondNameValue}
              type="text"
              className={styles.input}
              placeholder="your second-name..."
              onChange={catchSignupSecondNameValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            {signupPasswordInputError && validation.password ? (
              <div className={styles.error_text_box}>
                <span className={styles.error_text}>{validation.password}</span>
              </div>
            ) : (
              <label className={styles.label}>Password:</label>
            )}

            <input
              value={signupPasswordValue}
              type="password"
              className={styles.input}
              placeholder="your password..."
              onChange={catchPasswordValueHandler}
            />
          </div>
          <div className={styles.signup_button_box}>
            <div
              className={styles.signup_button}
              onClick={submitSignupFormValuesHandler}
            >
              signup
            </div>
          </div>
          <div className={styles.info_box}>
            <p>
              Already have an account or maybe you would like to use the
              app-guest account? - Then proceed to{' '}
              <NavLink className={styles.login_link} to={'/login'}>
                login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
