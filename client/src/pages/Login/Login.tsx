import { ChangeEvent, useContext, useState } from 'react';
import styles from './Login.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { CommonLoginValues } from '../../types/common_types';
import { MainLoader } from '../../components/Loaders/MainLoader/MainLoader';
import { NavLink } from 'react-router-dom';

export const Login = () => {
  const [loginEmailInputError, setLoginEmailInputError] =
    useState<boolean>(false);
  const [loginPasswordInputError, setLoginPasswordInputError] =
    useState<boolean>(false);

  const {
    loginEmailValue,
    loginPasswordValue,
    mainLoaderStatus,
    setLoginEmailValue,
    setLoginPasswordValue,
    logInUser,
  } = useContext(AuthContext);

  const loginValues: CommonLoginValues = {
    email: loginEmailValue,
    password: loginPasswordValue,
  };

  const validate = (values: CommonLoginValues) => {
    const errors: CommonLoginValues = {
      email: '',
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
    return errors;
  };

  const validation = validate(loginValues);

  const catchSignupEmailValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginEmailValue(e.currentTarget.value);
    if (validation.email.length > 0) {
      setLoginEmailInputError(true);
    }
  };
  const catchPasswordValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPasswordValue(e.currentTarget.value);
    if (validation.password.length > 0) {
      setLoginPasswordInputError(true);
    }
  };

  const submitSignupFormValuesHandler = () => {
    if (validation.email && validation.password) {
      setLoginEmailInputError(true);
      setLoginPasswordInputError(true);
    } else if (validation.email) {
      setLoginEmailInputError(true);
    } else if (validation.password) {
      setLoginPasswordInputError(true);
    } else if (!validation.email && !validation.password) {
      logInUser(loginValues);
      setLoginEmailInputError(false);
      setLoginPasswordInputError(false);
    }
  };
  return (
    <div className={styles.main_login_box}>
      <div className={styles.login_box}>
        {mainLoaderStatus === 'logging-in' && <MainLoader />}
        <form className={styles.main_form_box}>
          <div className={styles.input_box}>
            {loginEmailInputError && validation.email ? (
              <div className={styles.error_text_box}>
                <span className={styles.error_text}>{validation.email}</span>
              </div>
            ) : (
              <label className={styles.label}>Email:</label>
            )}
            <input
              value={loginEmailValue}
              type="text"
              className={styles.input}
              placeholder="your email..."
              onChange={catchSignupEmailValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            {loginPasswordInputError && validation.password ? (
              <div className={styles.error_text_box}>
                <span className={styles.error_text}>{validation.password}</span>
              </div>
            ) : (
              <label className={styles.label}>Password:</label>
            )}
            <input
              value={loginPasswordValue}
              type="password"
              className={styles.input}
              placeholder="your password..."
              onChange={catchPasswordValueHandler}
            />
          </div>
          <div className={styles.login_button_box}>
            <div
              className={styles.login_button}
              onClick={submitSignupFormValuesHandler}
            >
              login
            </div>
          </div>
          <div className={styles.info_box}>
            <p>
              Don't have an account?
              <NavLink className={styles.login_link} to={'/signup'}>
                signup
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
