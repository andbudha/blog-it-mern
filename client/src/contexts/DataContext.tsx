import { createContext, ReactNode, useContext, useState } from 'react';
import { randomImageAPI } from '../assets/api/randomImageAPI';
import {
  BlogLikingValues,
  BlogPostingValues,
  BlogResponse,
} from '../types/common_types';
import axios from 'axios';
import { baseUrl } from '../assets/base_url';
import { successfulToast } from '../assets/toasts/successfulToast';
import { AuthContext } from './AuthContext';

type DataContextType = {
  blogs: null | BlogResponse[];
  favoriteBlogs: null | BlogResponse[];
  dataLoaderStatus: boolean;
  customSelectStatus: boolean;
  addBlogFormStatus: boolean;
  addBlogTitleInputValue: string;
  addBlogKeyWordInputValue: string;
  addBlogContentInputValue: string;
  randomlyFetchedImage: string;
  informStatus: boolean;
  setDataLoaderStatus: (newStatus: boolean) => void;
  setCustomSelectStatus: (newStatus: boolean) => void;
  setAddBlogFormStatus: (newStatus: boolean) => void;
  setAddBlogTitleInputValue: (newValue: string) => void;
  setAddBlogKeyWordInputValue: (newValue: string) => void;
  setAddBlogContentInputValue: (newValue: string) => void;
  fetchRandomImage: (newImage: string) => Promise<void>;
  postBlog: (newBlogValues: BlogPostingValues) => Promise<void>;
  fetchBlogs: () => Promise<void>;
  toggleBlogLiking: (blogLikingRequestBody: BlogLikingValues) => Promise<void>;
  fetchFavorites: (userID: string) => Promise<void>;
  deleteBlog: (blogID: string) => Promise<void>;
  setInformStatus: (newStatus: boolean) => void;
};
const initialDataContextState = {
  blogs: null,
  favoriteBlogs: null,
  dataLoaderStatus: false,
  customSelectStatus: false,
  addBlogFormStatus: false,
  addBlogTitleInputValue: '',
  addBlogKeyWordInputValue: '',
  addBlogContentInputValue: '',
  randomlyFetchedImage: '',
  informStatus: false,
  setDataLoaderStatus: (newStatus: boolean) => newStatus,
  setCustomSelectStatus: (newStatus: boolean) => newStatus,
  setAddBlogFormStatus: (newStatus: boolean) => newStatus,
  setAddBlogTitleInputValue: (newValue: string) => newValue,
  setAddBlogKeyWordInputValue: (newValue: string) => newValue,
  setAddBlogContentInputValue: (newValue: string) => newValue,
  fetchRandomImage: () => Promise.resolve(),
  postBlog: () => Promise.resolve(),
  fetchBlogs: () => Promise.resolve(),
  toggleBlogLiking: () => Promise.resolve(),
  fetchFavorites: () => Promise.resolve(),
  setInformStatus: (newStatus: boolean) => newStatus,
  deleteBlog: () => Promise.resolve(),
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user, setAuthLoaderStatus } = useContext(AuthContext);
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [informStatus, setInformStatus] = useState<boolean>(false);
  const [customSelectStatus, setCustomSelectStatus] = useState<boolean>(false);
  const [addBlogFormStatus, setAddBlogFormStatus] = useState<boolean>(false);
  const [addBlogTitleInputValue, setAddBlogTitleInputValue] =
    useState<string>('');
  const [addBlogKeyWordInputValue, setAddBlogKeyWordInputValue] =
    useState<string>('');
  const [addBlogContentInputValue, setAddBlogContentInputValue] =
    useState<string>('');
  const [randomlyFetchedImage, setRandomlyFetchedImage] = useState<string>('');
  const [blogs, setBlogs] = useState<null | BlogResponse[]>(null);
  const [favoriteBlogs, setFavoriteBlogs] = useState<null | BlogResponse[]>(
    null
  );

  const fetchRandomImage = async (term: string) => {
    const res = await randomImageAPI.fetchImage(term);
    const newRandomImage =
      res.data.results[Math.floor(Math.random() * 10)].urls.regular;
    if (newRandomImage) {
      setRandomlyFetchedImage(newRandomImage);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/blogs/getblogs`);
      if (response) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {}
  };

  const fetchFavorites = async (userID: string) => {
    setAuthLoaderStatus('fetching');
    try {
      const response = await axios.get(
        `${baseUrl}/blogs/getfavorites?userID=${userID}`
      );
      if (response) {
        setAuthLoaderStatus('idle');
        setFavoriteBlogs(response.data.favoriteBlogs);
        fetchBlogs();
      }
    } catch (error) {}
  };

  const postBlog = async (newBlogValues: BlogPostingValues) => {
    setAuthLoaderStatus('adding');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/addblog`,
        newBlogValues
      );
      if (response) {
        successfulToast(response.data.message);
        setAddBlogFormStatus(false);
        setAddBlogTitleInputValue('');
        setAddBlogKeyWordInputValue('');
        setAddBlogContentInputValue('');
        setRandomlyFetchedImage('');
        setAuthLoaderStatus('idle');
        fetchBlogs();
      }
    } catch (error) {}
  };

  const toggleBlogLiking = async (blogLikingRequestBody: BlogLikingValues) => {
    setDataLoaderStatus(true);
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/liking`,
        blogLikingRequestBody
      );
      if (response) {
        setDataLoaderStatus(false);
        fetchBlogs();
        fetchFavorites(user!.userID);
      }
    } catch (error) {}
  };

  const deleteBlog = async (blogID: string) => {
    console.log(blogID);

    setDataLoaderStatus(true);
    try {
      const response = await axios.post(`${baseUrl}/blogs/delete-blog`, {
        blogID,
      });
      if (response) {
        setDataLoaderStatus(false);
        setInformStatus(true);
        fetchBlogs();
      }
    } catch (error) {}
  };
  return (
    <DataContext.Provider
      value={{
        blogs,
        favoriteBlogs,
        dataLoaderStatus,
        customSelectStatus,
        addBlogFormStatus,
        addBlogTitleInputValue,
        addBlogKeyWordInputValue,
        addBlogContentInputValue,
        randomlyFetchedImage,
        informStatus,
        setDataLoaderStatus,
        setCustomSelectStatus,
        setAddBlogFormStatus,
        setAddBlogTitleInputValue,
        setAddBlogKeyWordInputValue,
        setAddBlogContentInputValue,
        fetchRandomImage,
        postBlog,
        fetchBlogs,
        toggleBlogLiking,
        fetchFavorites,
        deleteBlog,
        setInformStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
