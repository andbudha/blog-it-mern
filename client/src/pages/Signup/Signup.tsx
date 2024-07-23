import { NavLink } from 'react-router-dom';
import styles from './Signup.module.scss';
import { ChangeEvent, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Signup = () => {
  const {
    signupEmailValue,
    signupFirstNameValue,
    signupSecondNameValue,
    signupPasswordValue,
    setSignupEmailValue,
    setSignupFirstNameValue,
    setSignupSecondNameValue,
    setSignupPasswordValue,
  } = useContext(AuthContext);
  const catchSignupEmailValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupEmailValue(e.currentTarget.value);
  };

  const catchSignupFirstNameValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupFirstNameValue(e.currentTarget.value);
  };
  const catchSignupSecondNameValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSignupSecondNameValue(e.currentTarget.value);
  };

  const catchPasswordValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupPasswordValue(e.currentTarget.value);
  };

  const submitSignupFormValuesHandler = () => {
    const user = {
      email: signupEmailValue,
      firstname: signupFirstNameValue,
      secondname: signupSecondNameValue,
      password: signupPasswordValue,
    };

    console.log(user);
  };
  return (
    <div className={styles.main_signup_box}>
      <div className={styles.signup_box}>
        <form className={styles.main_form_box}>
          <div className={styles.input_box}>
            <label className={styles.label}>Email:</label>
            <input
              value={signupEmailValue}
              type="text"
              className={styles.input}
              placeholder="your email..."
              onChange={catchSignupEmailValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>First-name:</label>
            <input
              value={signupFirstNameValue}
              type="text"
              className={styles.input}
              placeholder="your first-name..."
              onChange={catchSignupFirstNameValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Second-name:</label>
            <input
              value={signupSecondNameValue}
              type="text"
              className={styles.input}
              placeholder="your second-name"
              onChange={catchSignupSecondNameValueHandler}
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Password:</label>
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
