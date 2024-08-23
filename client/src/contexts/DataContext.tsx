import { createContext, ReactNode, useContext, useState } from 'react';
import { randomImageAPI } from '../assets/api/randomImageAPI';
import {
  BlogLikingValues,
  BlogPostingValues,
  BlogResponse,
  CommentaryValues,
  EditBlogPostingValues,
  EditCommentaryValues,
} from '../types/common_types';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../assets/base_url';
import { successfulToast } from '../assets/toasts/successfulToast';
import { AuthContext } from './AuthContext';
import { notificationToast } from '../assets/toasts/notificationToast';
import { failureToast } from '../assets/toasts/failureToast';
import { getToken } from '../assets/utils/tokenServices';

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
  deleteCommentaryPopupWindowStatus: boolean;
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
  deleteCommentary: (blogID: string, commentaryID: string) => void;
  editCommentary: (editedCommentary: EditCommentaryValues) => Promise<void>;
  setDeleteCommentaryPopupWindowStatus: (newStatus: boolean) => void;
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
  deleteCommentaryPopupWindowStatus: false,
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
  deleteCommentary: () => Promise.resolve(),
  editCommentary: () => Promise.resolve(),
  setDeleteCommentaryPopupWindowStatus: (newStatus: boolean) => newStatus,
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
  const [
    deleteCommentaryPopupWindowStatus,
    setDeleteCommentaryPopupWindowStatus,
  ] = useState<boolean>(false);

  const fetchRandomImage = async (term: string) => {
    const res = await randomImageAPI.fetchImage(term);
    const newRandomImage =
      res.data.results[Math.floor(Math.random() * 10)].urls.regular;
    if (newRandomImage) {
      setRandomlyFetchedImage(newRandomImage);
    }
  };

  const fetchBlogs = async () => {
    setAuthLoaderStatus('fetching');
    try {
      const response = await axios.get(`${baseUrl}/blogs/getblogs`);
      console.log(response);

      if (response) {
        setBlogs(response.data.blogs);
        setAuthLoaderStatus('idle');
      }
    } catch (error) {
      if (error as AxiosError) {
        failureToast(
          'Unexpected error occurred while fetching blogs. Try again later, please!'
        );
      }
    }
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
        notificationToast(response.data.message);
      }
    } catch (error) {
    } finally {
      setAuthLoaderStatus('idle');
    }
  };

  const deleteCommentary = async (blogID: string, commentaryID: string) => {
    setAuthLoaderStatus('deleting');
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      const body = new URLSearchParams({
        blogID: blogID,
        commentaryID: commentaryID,
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
      };

      try {
        // const response = await axios.post(
        //   `${baseUrl}/blogs/delete-commentary`,
        //   { blogID, commentaryID },
        //   { headers: customHeaders }
        // );

        const response = await fetch(
          `${baseUrl}/blogs/delete-commentary`,
          requestOptions
        );
        if (response) {
          fetchBlogs();
          setDeleteCommentaryPopupWindowStatus(false);
          setAuthLoaderStatus('idle');
          notificationToast('Commentary successfully deleted!');
        }
      } catch (err) {
        const error = err as Error;
        failureToast(error.message);
        setAuthLoaderStatus('idle');
      }
    }
  };

  const editCommentary = async (editedCommentaryBody: EditCommentaryValues) => {
    setAuthLoaderStatus('editing');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/edit-commentary`,
        editedCommentaryBody
      );
      if (response) {
        setAuthLoaderStatus('idle');
        fetchBlogs();
        notificationToast('Commentary successfully updated!');
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
        displayPopupWindowStatus,
        displayBlogEditFormStatus,
        editBlogTitleInputValue,
        editBlogKeyWordInputValue,
        editBlogContentInputValue,
        commentaryTextareaValue,
        deleteCommentaryPopupWindowStatus,
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
        deleteCommentary,
        editCommentary,
        setDeleteCommentaryPopupWindowStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
