import { createContext, ReactNode, useState } from 'react';

type DataContextType = {
  dataLoaderStatus: boolean;
  customSelectStatus: boolean;
  editProfileFormMaritalStatusValue: string;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setCustomSelectStatus: (newStatus: boolean) => void;
  setEditProfileFormMaritalStatusValue: (maritalStatus: string) => void;
};
const initialDataContextState = {
  dataLoaderStatus: false,
  customSelectStatus: false,
  editProfileFormMaritalStatusValue: 'Marital-status',
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setCustomSelectStatus: (newStatus: boolean) => newStatus,
  setEditProfileFormMaritalStatusValue: (maritalStatus: string) =>
    maritalStatus,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [customSelectStatus, setCustomSelectStatus] = useState<boolean>(false);
  const [
    editProfileFormMaritalStatusValue,
    setEditProfileFormMaritalStatusValue,
  ] = useState<string>('Marital-status');
  console.log(dataLoaderStatus);

  return (
    <DataContext.Provider
      value={{
        dataLoaderStatus,
        customSelectStatus,
        editProfileFormMaritalStatusValue,
        setDataLoaderStatus,
        setCustomSelectStatus,
        setEditProfileFormMaritalStatusValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
