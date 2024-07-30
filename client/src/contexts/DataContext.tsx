import { createContext, ReactNode, useState } from 'react';

type DataContextType = {
  dataLoaderStatus: boolean;
  activeEditForm: boolean;
  customSelectStatus: boolean;
  editProfileFormMaritalStatusValue: string;
  firstNameEditProfileFormValue: string;
  lastNameEditProfileFormValue: string;
  ageEditProfileFormValue: string;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setActiveEditForm: (newStatus: boolean) => void;
  setCustomSelectStatus: (newStatus: boolean) => void;
  setEditProfileFormMaritalStatusValue: (maritalStatus: string) => void;
  setFirstNameEditProfileFormValue: (newValue: string) => void;
  setLastNameEditProfileFormValue: (newValue: string) => void;
  setAgeEditProfileFormValue: (newValue: string) => void;
};
const initialDataContextState = {
  dataLoaderStatus: false,
  activeEditForm: false,
  customSelectStatus: false,
  editProfileFormMaritalStatusValue: 'Marital-status',
  firstNameEditProfileFormValue: '',
  lastNameEditProfileFormValue: '',
  ageEditProfileFormValue: '',
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setActiveEditForm: (newStatus: boolean) => newStatus,
  setCustomSelectStatus: (newStatus: boolean) => newStatus,
  setEditProfileFormMaritalStatusValue: (maritalStatus: string) =>
    maritalStatus,
  setFirstNameEditProfileFormValue: (newValue: string) => newValue,
  setLastNameEditProfileFormValue: (newValue: string) => newValue,
  setAgeEditProfileFormValue: (newValue: string) => newValue,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [activeEditForm, setActiveEditForm] = useState<boolean>(false);
  const [customSelectStatus, setCustomSelectStatus] = useState<boolean>(false);
  const [
    editProfileFormMaritalStatusValue,
    setEditProfileFormMaritalStatusValue,
  ] = useState<string>('Marital-status');
  const [firstNameEditProfileFormValue, setFirstNameEditProfileFormValue] =
    useState<string>('');
  const [lastNameEditProfileFormValue, setLastNameEditProfileFormValue] =
    useState<string>('');
  const [ageEditProfileFormValue, setAgeEditProfileFormValue] =
    useState<string>('');

  return (
    <DataContext.Provider
      value={{
        dataLoaderStatus,
        activeEditForm,
        customSelectStatus,
        editProfileFormMaritalStatusValue,
        firstNameEditProfileFormValue,
        lastNameEditProfileFormValue,
        ageEditProfileFormValue,
        setDataLoaderStatus,
        setActiveEditForm,
        setCustomSelectStatus,
        setEditProfileFormMaritalStatusValue,
        setFirstNameEditProfileFormValue,
        setLastNameEditProfileFormValue,
        setAgeEditProfileFormValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
