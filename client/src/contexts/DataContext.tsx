import { createContext, ReactNode, useContext, useState } from 'react';
import { randomImageAPI } from '../assets/api/randomImageAPI';
import {
  BlogLikingValues,
  BlogPostingValues,
  BlogResponse,
  CommentaryValues,
  EditBlogPostingValues,
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
  displayPopupWindowStatus: boolean;
  displayBlogEditFormStatus: boolean;
  editBlogTitleInputValue: string;
  editBlogKeyWordInputValue: string;
  editBlogContentInputValue: string;
  commentaryTextareaValue: string;
  displayTextareaStatus: boolean;
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
  setDisplayPopupWindowStatus: (newStatus: boolean) => void;
  setDisplayBlogEditFormStatus: (newStatus: boolean) => void;
  setEditBlogTitleInputValue: (newValue: string) => void;
  setEditBlogKeyWordInputValue: (newValue: string) => void;
  setEditBlogContentInputValue: (newValue: string) => void;
  editBlog: (newBlogValues: EditBlogPostingValues) => Promise<void>;
  setCommentrayTextareaValue: (newValue: string) => void;
  postCommentary: (newCommentary: CommentaryValues) => Promise<void>;
  setDisplayTextAreaStatus: (newStatus: boolean) => void;
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
  displayPopupWindowStatus: false,
  displayBlogEditFormStatus: false,
  editBlogTitleInputValue: '',
  editBlogKeyWordInputValue: '',
  editBlogContentInputValue: '',
  commentaryTextareaValue: '',
  displayTextareaStatus: false,
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
  setDisplayPopupWindowStatus: (newStatus: boolean) => newStatus,
  setDisplayBlogEditFormStatus: (newStatus: boolean) => newStatus,
  setEditBlogTitleInputValue: (newValue: string) => newValue,
  setEditBlogKeyWordInputValue: (newValue: string) => newValue,
  setEditBlogContentInputValue: (newValue: string) => newValue,
  editBlog: () => Promise.resolve(),
  setCommentrayTextareaValue: (newValue: string) => newValue,
  postCommentary: () => Promise.resolve(),
  setDisplayTextAreaStatus: (newStatus: boolean) => newStatus,
} as DataContextType;
export const DataContext = createContext(initialDataContextState);

type DataProviderProps = { children: ReactNode };

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user, setAuthLoaderStatus } = useContext(AuthContext);
  const [dataLoaderStatus, setDataLoaderStatus] = useState<boolean>(false);
  const [informStatus, setInformStatus] = useState<boolean>(false);
  const [displayPopupWindowStatus, setDisplayPopupWindowStatus] =
    useState<boolean>(false);
  const [displayBlogEditFormStatus, setDisplayBlogEditFormStatus] =
    useState<boolean>(false);
  const [customSelectStatus, setCustomSelectStatus] = useState<boolean>(false);
  const [addBlogFormStatus, setAddBlogFormStatus] = useState<boolean>(false);
  const [addBlogTitleInputValue, setAddBlogTitleInputValue] =
    useState<string>('');
  const [addBlogKeyWordInputValue, setAddBlogKeyWordInputValue] =
    useState<string>('');
  const [addBlogContentInputValue, setAddBlogContentInputValue] =
    useState<string>('');

  const [editBlogTitleInputValue, setEditBlogTitleInputValue] =
    useState<string>('');
  const [editBlogKeyWordInputValue, setEditBlogKeyWordInputValue] =
    useState<string>('');
  const [editBlogContentInputValue, setEditBlogContentInputValue] =
    useState<string>('');
  const [randomlyFetchedImage, setRandomlyFetchedImage] = useState<string>('');
  const [blogs, setBlogs] = useState<null | BlogResponse[]>(null);
  const [favoriteBlogs, setFavoriteBlogs] = useState<null | BlogResponse[]>(
    null
  );
  const [commentaryTextareaValue, setCommentrayTextareaValue] =
    useState<string>('');
  const [displayTextareaStatus, setDisplayTextAreaStatus] =
    useState<boolean>(false);

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
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/liking`,
        blogLikingRequestBody
      );
      if (response) {
        fetchBlogs();
        fetchFavorites(user!.userID);
      }
    } catch (error) {}
  };

  const deleteBlog = async (blogID: string) => {
    setAuthLoaderStatus('deleting');
    try {
      const response = await axios.post(`${baseUrl}/blogs/delete-blog`, {
        blogID,
      });
      if (response) {
        setAuthLoaderStatus('idle');
        setDisplayPopupWindowStatus(false);
        setInformStatus(true);
        fetchBlogs();
        setEditBlogTitleInputValue('');
        setEditBlogContentInputValue('');
      }
    } catch (error) {}
  };

  const editBlog = async (newBlogValues: EditBlogPostingValues) => {
    console.log(newBlogValues);
    setAuthLoaderStatus('editing');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/edit-blog`,
        newBlogValues
      );
      if (response) {
        fetchBlogs();
        setAuthLoaderStatus('idle');
        setDisplayBlogEditFormStatus(false);
      }
    } catch (error) {}
  };

  const postCommentary = async (newCommentary: CommentaryValues) => {
    setAuthLoaderStatus('adding');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/post-commentary`,
        newCommentary
      );
      if (response) {
        setAuthLoaderStatus('idle');
        fetchBlogs();
        setCommentrayTextareaValue('');
        console.log(response.data.blog.comments);
      }
    } catch (error) {
    } finally {
      setAuthLoaderStatus('idle');
    }
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
        displayPopupWindowStatus,
        displayBlogEditFormStatus,
        editBlogTitleInputValue,
        editBlogKeyWordInputValue,
        editBlogContentInputValue,
        commentaryTextareaValue,
        displayTextareaStatus,
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
        setDisplayPopupWindowStatus,
        setDisplayBlogEditFormStatus,
        setEditBlogTitleInputValue,
        setEditBlogKeyWordInputValue,
        setEditBlogContentInputValue,
        editBlog,
        setCommentrayTextareaValue,
        postCommentary,
        setDisplayTextAreaStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
