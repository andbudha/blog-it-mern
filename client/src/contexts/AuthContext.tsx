import { createContext, ReactNode, useState } from 'react';
import {
  CommonLoginValues,
  CommonSignupValues,
  LoggedinUserResponseType,
  MainLoaderStatus,
} from '../types/common_types';
import { successfulToast } from '../assets/toasts/successfulToast';
import axios, { AxiosError } from 'axios';
import { failureToast } from '../assets/toasts/failureToast';
import { baseUrl } from '../assets/base_url';

type AuthContextType = {
  user: null | LoggedinUserResponseType;
  signupEmailValue: string;
  signupFirstNameValue: string;
  signupSecondNameValue: string;
  signupPasswordValue: string;
  loginEmailValue: string;
  loginPasswordValue: string;
  mainLoaderStatus: string;
  setSignupEmailValue: (newValue: string) => void;
  setSignupFirstNameValue: (newValue: string) => void;
  setSignupSecondNameValue: (newValue: string) => void;
  setSignupPasswordValue: (newValue: string) => void;
  setLoginEmailValue: (newValue: string) => void;
  setLoginPasswordValue: (newValue: string) => void;
  registerUser: (signupValues: CommonSignupValues) => Promise<void>;
  logInUser: (loginValues: CommonLoginValues) => Promise<void>;
};
const initialAuthContextState = {
  user: null,
  signupEmailValue: '',
  signupFirstNameValue: '',
  signupSecondNameValue: '',
  signupPasswordValue: '',
  loginEmailValue: '',
  loginPasswordValue: '',
  mainLoaderStatus: 'idle',
  setSignupEmailValue: (newValue: string) => newValue,
  setSignupFirstNameValue: (newValue: string) => newValue,
  setSignupSecondNameValue: (newValue: string) => newValue,
  setSignupPasswordValue: (newValue: string) => newValue,
  setLoginEmailValue: (newValue: string) => newValue,
  setLoginPasswordValue: (newValue: string) => newValue,
  registerUser: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
} as AuthContextType;
export const AuthContext = createContext(initialAuthContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | LoggedinUserResponseType>(null);
  const [mainLoaderStatus, setMainLoaderStatus] =
    useState<MainLoaderStatus>('idle');
  const [signupEmailValue, setSignupEmailValue] = useState<string>('');
  const [signupFirstNameValue, setSignupFirstNameValue] = useState<string>('');
  const [signupSecondNameValue, setSignupSecondNameValue] =
    useState<string>('');
  const [signupPasswordValue, setSignupPasswordValue] = useState<string>('');
  const [loginEmailValue, setLoginEmailValue] = useState<string>('');
  const [loginPasswordValue, setLoginPasswordValue] = useState<string>('');

  console.log(user);

  const registerUser = async (signupValues: CommonSignupValues) => {
    setMainLoaderStatus('registering');
    try {
      const response = await axios.post(
        `${baseUrl}/users/register`,
        signupValues
      );
      if (response) {
        setMainLoaderStatus('idle');
        successfulToast(response.data.message);
        setSignupEmailValue('');
        setSignupFirstNameValue('');
        setSignupSecondNameValue('');
        setSignupPasswordValue('');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError)
        failureToast(`${error.response?.data.errorMessage}`);
    } finally {
      setMainLoaderStatus('idle');
    }
  };

  const logInUser = async (loginValues: CommonLoginValues) => {
    setMainLoaderStatus('logging-in');
    try {
      const response = await axios.post(`${baseUrl}/users/login`, loginValues);
      if (response) {
        setMainLoaderStatus('idle');
        successfulToast(response.data.message);
        setUser(response.data.user);
        setLoginEmailValue('');
        setLoginPasswordValue('');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError)
        failureToast(`${error.response?.data.errorMessage}`);
    } finally {
      setMainLoaderStatus('idle');
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        signupEmailValue,
        signupFirstNameValue,
        signupSecondNameValue,
        signupPasswordValue,
        loginEmailValue,
        loginPasswordValue,
        mainLoaderStatus,
        setSignupEmailValue,
        setSignupFirstNameValue,
        setSignupSecondNameValue,
        setSignupPasswordValue,
        setLoginEmailValue,
        setLoginPasswordValue,
        registerUser,
        logInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
