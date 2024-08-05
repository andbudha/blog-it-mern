import { createContext, ReactNode, useState } from 'react';
import {
  CommonEditProfileFormValues,
  CommonLoginValues,
  CommonSignupValues,
  LoggedinUserResponseType,
  MainLoaderStatus,
} from '../types/common_types';
import { successfulToast } from '../assets/toasts/successfulToast';
import axios, { AxiosError } from 'axios';
import { failureToast } from '../assets/toasts/failureToast';
import { baseUrl } from '../assets/base_url';
import { getToken, removeToken } from '../assets/utils/tokenServices';

type AuthContextType = {
  user: null | LoggedinUserResponseType;
  signupEmailValue: string;
  signupFirstNameValue: string;
  signupLastNameValue: string;
  signupPasswordValue: string;
  loginEmailValue: string;
  loginPasswordValue: string;
  authLoaderStatus: string;
  activeEditForm: boolean;
  firstNameEditProfileFormValue: string;
  lastNameEditProfileFormValue: string;
  ageEditProfileFormValue: string;
  editProfileFormMaritalStatusValue: string;
  updateProfileImageButtonStatus: boolean;
  burgerMenuStatus: boolean;
  setAuthLoaderStatus: (newStatus: MainLoaderStatus) => void;
  setSignupEmailValue: (newValue: string) => void;
  setSignupFirstNameValue: (newValue: string) => void;
  setSignupLastNameValue: (newValue: string) => void;
  setSignupPasswordValue: (newValue: string) => void;
  setLoginEmailValue: (newValue: string) => void;
  setLoginPasswordValue: (newValue: string) => void;
  registerUser: (signupValues: CommonSignupValues) => Promise<void>;
  logUserIn: (loginValues: CommonLoginValues) => Promise<void>;
  logUserOut: () => void;
  getUserProfile: () => Promise<void>;
  updateProfileDetails: (
    newProfileDetails: CommonEditProfileFormValues
  ) => Promise<void>;
  setActiveEditForm: (newStatus: boolean) => void;
  setFirstNameEditProfileFormValue: (newValue: string) => void;
  setLastNameEditProfileFormValue: (newValue: string) => void;
  setAgeEditProfileFormValue: (newValue: string) => void;
  setEditProfileFormMaritalStatusValue: (maritalStatus: string) => void;
  setUpdateProfileImageButtonStatus: (newStatus: boolean) => void;
  setBurgerMenuStatus: (newStatus: boolean) => void;
  uploadProfileImage: (profileImageUpdate: FormData) => Promise<void>;
};
const initialAuthContextState = {
  user: null,
  signupEmailValue: '',
  signupFirstNameValue: '',
  signupLastNameValue: '',
  signupPasswordValue: '',
  loginEmailValue: '',
  loginPasswordValue: '',
  authLoaderStatus: 'idle',
  activeEditForm: false,
  firstNameEditProfileFormValue: '',
  lastNameEditProfileFormValue: '',
  ageEditProfileFormValue: '',
  editProfileFormMaritalStatusValue: '',
  updateProfileImageButtonStatus: false,
  burgerMenuStatus: false,
  setAuthLoaderStatus: (newStatus: MainLoaderStatus) => newStatus,
  setSignupEmailValue: (newValue: string) => newValue,
  setSignupFirstNameValue: (newValue: string) => newValue,
  setSignupLastNameValue: (newValue: string) => newValue,
  setSignupPasswordValue: (newValue: string) => newValue,
  setLoginEmailValue: (newValue: string) => newValue,
  setLoginPasswordValue: (newValue: string) => newValue,
  registerUser: () => Promise.resolve(),
  logUserIn: () => Promise.resolve(),
  logUserOut: () => Promise.resolve(),
  getUserProfile: () => Promise.resolve(),
  updateProfileDetails: () => Promise.resolve(),
  setActiveEditForm: (newStatus: boolean) => newStatus,
  setFirstNameEditProfileFormValue: (newValue: string) => newValue,
  setLastNameEditProfileFormValue: (newValue: string) => newValue,
  setAgeEditProfileFormValue: (newValue: string) => newValue,
  setEditProfileFormMaritalStatusValue: (maritalStatus: string) =>
    maritalStatus,
  setUpdateProfileImageButtonStatus: (newStatus: boolean) => newStatus,
  setBurgerMenuStatus: (newStatus: boolean) => newStatus,
  uploadProfileImage: () => Promise.resolve(),
} as AuthContextType;
export const AuthContext = createContext(initialAuthContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | LoggedinUserResponseType>(null);
  console.log(user);

  const [authLoaderStatus, setAuthLoaderStatus] =
    useState<MainLoaderStatus>('idle');
  const [signupEmailValue, setSignupEmailValue] = useState<string>('');
  const [signupFirstNameValue, setSignupFirstNameValue] = useState<string>('');
  const [signupLastNameValue, setSignupLastNameValue] = useState<string>('');
  const [signupPasswordValue, setSignupPasswordValue] = useState<string>('');
  const [loginEmailValue, setLoginEmailValue] = useState<string>('');
  const [loginPasswordValue, setLoginPasswordValue] = useState<string>('');
  const [activeEditForm, setActiveEditForm] = useState<boolean>(false);
  const [firstNameEditProfileFormValue, setFirstNameEditProfileFormValue] =
    useState<string>('');
  const [lastNameEditProfileFormValue, setLastNameEditProfileFormValue] =
    useState<string>('');
  const [ageEditProfileFormValue, setAgeEditProfileFormValue] =
    useState<string>('');
  const [
    editProfileFormMaritalStatusValue,
    setEditProfileFormMaritalStatusValue,
  ] = useState<string>('');
  const [updateProfileImageButtonStatus, setUpdateProfileImageButtonStatus] =
    useState<boolean>(false);
  const [burgerMenuStatus, setBurgerMenuStatus] = useState<boolean>(false);

  const registerUser = async (signupValues: CommonSignupValues) => {
    setAuthLoaderStatus('registering');
    try {
      const response = await axios.post(
        `${baseUrl}/users/register`,
        signupValues
      );
      if (response) {
        setAuthLoaderStatus('idle');
        successfulToast(response.data.message);
        setSignupEmailValue('');
        setSignupFirstNameValue('');
        setSignupLastNameValue('');
        setSignupPasswordValue('');
      }
    } catch (error) {
      if (error instanceof AxiosError)
        failureToast(`${error.response?.data.errorMessage}`);
    } finally {
      setAuthLoaderStatus('idle');
    }
  };

  const logUserIn = async (loginValues: CommonLoginValues) => {
    setAuthLoaderStatus('logging-in');
    try {
      const response = await axios.post(`${baseUrl}/users/login`, loginValues);
      if (response.data.token) {
        localStorage.setItem('blog-it-token', response.data.token);
      }
      if (response) {
        console.log(response);

        setAuthLoaderStatus('idle');
        successfulToast(response.data.message);
        setUser(response.data.user);
        setLoginEmailValue('');
        setLoginPasswordValue('');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        failureToast(
          `Status 404. The server cannot find the requested resource.`
        );
      }
    } finally {
      setAuthLoaderStatus('idle');
    }
  };

  const getUserProfile = async () => {
    setAuthLoaderStatus('loading-profile');
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      try {
        let response = await fetch(`${baseUrl}/users/profile`, requestOptions);
        const data = await response.json();
        if (data) {
          setAuthLoaderStatus('idle');
          setUser(data.user);
        }
      } catch (error) {
        console.log('Get user profile error:::', error);
      } finally {
        setAuthLoaderStatus('idle');
      }
    }
  };

  const logUserOut = async () => {
    try {
      removeToken();
      setUser(null);
      successfulToast('You have successfully logged out!');
    } catch (error) {}
  };

  const updateProfileDetails = async (
    newProfileDetails: CommonEditProfileFormValues
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/updatedetails`,
        newProfileDetails
      );
      if (response) {
        setActiveEditForm(false);
        getUserProfile();
      }
    } catch (error) {
    } finally {
    }
  };

  const uploadProfileImage = async (profileImageUpdate: FormData) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/uploadimage`,
        profileImageUpdate
      );
      if (response) {
        setUpdateProfileImageButtonStatus(false);
        getUserProfile();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        activeEditForm,
        signupEmailValue,
        signupFirstNameValue,
        signupLastNameValue,
        signupPasswordValue,
        loginEmailValue,
        loginPasswordValue,
        authLoaderStatus,
        firstNameEditProfileFormValue,
        lastNameEditProfileFormValue,
        ageEditProfileFormValue,
        editProfileFormMaritalStatusValue,
        burgerMenuStatus,
        updateProfileImageButtonStatus,
        setAuthLoaderStatus,
        setActiveEditForm,
        setSignupEmailValue,
        setSignupFirstNameValue,
        setSignupLastNameValue,
        setSignupPasswordValue,
        setLoginEmailValue,
        setLoginPasswordValue,
        registerUser,
        logUserIn,
        logUserOut,
        getUserProfile,
        updateProfileDetails,
        setFirstNameEditProfileFormValue,
        setLastNameEditProfileFormValue,
        setAgeEditProfileFormValue,
        setEditProfileFormMaritalStatusValue,
        setUpdateProfileImageButtonStatus,
        setBurgerMenuStatus,
        uploadProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
