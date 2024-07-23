import { createContext, ReactNode } from 'react';

type DataContextType = {};
const initialDataContextState = {} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
