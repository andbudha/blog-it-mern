import { createContext, ReactNode, useState } from 'react';

type DataContextType = {
  dataLoaderStatus: boolean;
  customSelectStatus: boolean;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setCustomSelectStatus: (newStatus: boolean) => void;
};
const initialDataContextState = {
  dataLoaderStatus: false,
  customSelectStatus: false,
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setCustomSelectStatus: (newStatus: boolean) => newStatus,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [customSelectStatus, setCustomSelectStatus] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        dataLoaderStatus,
        customSelectStatus,

        setDataLoaderStatus,
        setCustomSelectStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
