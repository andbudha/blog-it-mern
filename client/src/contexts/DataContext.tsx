import { createContext, ReactNode, useState } from 'react';

type DataContextType = {
  dataLoaderStatus: boolean;
};
const initialDataContextState = {
  dataLoaderStatus: false,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  return (
    <DataContext.Provider value={{ dataLoaderStatus }}>
      {children}
    </DataContext.Provider>
  );
};
