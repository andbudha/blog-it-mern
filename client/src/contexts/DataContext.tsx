import { createContext, ReactNode, useState } from 'react';

type DataContextType = {
  dataLoaderStatus: boolean;
  customSelectStatus: boolean;
  addBlogFormStatus: boolean;
  addBlogTitleInputValue: string;
  addBlogKeyWordInputValue: string;
  addBlogContentInputValue: string;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setCustomSelectStatus: (newStatus: boolean) => void;
  setAddBlogFormStatus: (newStatus: boolean) => void;
  setAddBlogTitleInputValue: (newValue: string) => void;
  setAddBlogKeyWordInputValue: (newValue: string) => void;
  setAddBlogContentInputValue: (newValue: string) => void;
};
const initialDataContextState = {
  dataLoaderStatus: false,
  customSelectStatus: false,
  addBlogFormStatus: false,
  addBlogTitleInputValue: '',
  addBlogKeyWordInputValue: '',
  addBlogContentInputValue: '',
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setCustomSelectStatus: (newStatus: boolean) => newStatus,
  setAddBlogFormStatus: (newStatus: boolean) => newStatus,
  setAddBlogTitleInputValue: (newValue: string) => newValue,
  setAddBlogKeyWordInputValue: (newValue: string) => newValue,
  setAddBlogContentInputValue: (newValue: string) => newValue,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [customSelectStatus, setCustomSelectStatus] = useState<boolean>(false);
  const [addBlogFormStatus, setAddBlogFormStatus] = useState<boolean>(false);
  const [addBlogTitleInputValue, setAddBlogTitleInputValue] =
    useState<string>('');
  const [addBlogKeyWordInputValue, setAddBlogKeyWordInputValue] =
    useState<string>('');
  const [addBlogContentInputValue, setAddBlogContentInputValue] =
    useState<string>('');

  return (
    <DataContext.Provider
      value={{
        dataLoaderStatus,
        customSelectStatus,
        addBlogFormStatus,
        addBlogTitleInputValue,
        addBlogKeyWordInputValue,
        addBlogContentInputValue,
        setDataLoaderStatus,
        setCustomSelectStatus,
        setAddBlogFormStatus,
        setAddBlogTitleInputValue,
        setAddBlogKeyWordInputValue,
        setAddBlogContentInputValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
