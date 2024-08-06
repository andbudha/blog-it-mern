import { createContext, ReactNode, useState } from 'react';
import { randomImageAPI } from '../assets/api/randomImageAPI';
import { BlogPostingValues } from '../types/common_types';

type DataContextType = {
  dataLoaderStatus: boolean;
  customSelectStatus: boolean;
  addBlogFormStatus: boolean;
  addBlogTitleInputValue: string;
  addBlogKeyWordInputValue: string;
  addBlogContentInputValue: string;
  randomlyFetchedImage: string;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setCustomSelectStatus: (newStatus: boolean) => void;
  setAddBlogFormStatus: (newStatus: boolean) => void;
  setAddBlogTitleInputValue: (newValue: string) => void;
  setAddBlogKeyWordInputValue: (newValue: string) => void;
  setAddBlogContentInputValue: (newValue: string) => void;
  fetchRandomImage: (newImage: string) => Promise<void>;
  postBlog: (newBlogValues: BlogPostingValues) => Promise<void>;
};
const initialDataContextState = {
  dataLoaderStatus: false,
  customSelectStatus: false,
  addBlogFormStatus: false,
  addBlogTitleInputValue: '',
  addBlogKeyWordInputValue: '',
  addBlogContentInputValue: '',
  randomlyFetchedImage: '',
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setCustomSelectStatus: (newStatus: boolean) => newStatus,
  setAddBlogFormStatus: (newStatus: boolean) => newStatus,
  setAddBlogTitleInputValue: (newValue: string) => newValue,
  setAddBlogKeyWordInputValue: (newValue: string) => newValue,
  setAddBlogContentInputValue: (newValue: string) => newValue,
  fetchRandomImage: () => Promise.resolve(),
  postBlog: () => Promise.resolve(),
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
  const [randomlyFetchedImage, setRandomlyFetchedImage] = useState<string>('');

  const fetchRandomImage = async (term: string) => {
    const res = await randomImageAPI.fetchImage(term);
    const newRandomImage =
      res.data.results[Math.floor(Math.random() * 10)].urls.regular;
    if (newRandomImage) {
      setRandomlyFetchedImage(newRandomImage);
    }
  };

  const postBlog = async (newBlogValues: BlogPostingValues) => {
    console.log(newBlogValues);
    setRandomlyFetchedImage('');
  };

  return (
    <DataContext.Provider
      value={{
        dataLoaderStatus,
        customSelectStatus,
        addBlogFormStatus,
        addBlogTitleInputValue,
        addBlogKeyWordInputValue,
        addBlogContentInputValue,
        randomlyFetchedImage,
        setDataLoaderStatus,
        setCustomSelectStatus,
        setAddBlogFormStatus,
        setAddBlogTitleInputValue,
        setAddBlogKeyWordInputValue,
        setAddBlogContentInputValue,
        fetchRandomImage,
        postBlog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
