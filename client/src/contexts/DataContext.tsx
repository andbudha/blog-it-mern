import { createContext, ReactNode, useState } from 'react';

type DataContextType = {
  dataLoaderStatus: boolean;
  activeEditForm: boolean;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setActiveEditForm: (newStatus: boolean) => void;
};
const initialDataContextState = {
  dataLoaderStatus: false,
  activeEditForm: false,
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setActiveEditForm: (newStatus: boolean) => newStatus,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [activeEditForm, setActiveEditForm] = useState<boolean>(false);
  return (
    <DataContext.Provider
      value={{
        dataLoaderStatus,
        activeEditForm,
        setDataLoaderStatus,
        setActiveEditForm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
