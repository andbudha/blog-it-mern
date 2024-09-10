import { createContext, ReactNode, useContext, useState } from 'react';
import { randomImageAPI } from '../assets/api/randomImageAPI';
import {
  BlogLikingValues,
  BlogPostingValues,
  BlogResponse,
  CommentaryValues,
  DataLoaderStatus,
  EditBlogPostingValues,
  EditCommentaryValues,
} from '../types/common_types';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../assets/base_url';
import { AuthContext } from './AuthContext';
import { notificationToast } from '../assets/toasts/notificationToast';
import { failureToast } from '../assets/toasts/failureToast';
import { getToken } from '../assets/utils/tokenServices';

type DataContextType = {
  blogs: null | BlogResponse[];
  favoriteBlogs: null | BlogResponse[];
  dataLoaderStatus: DataLoaderStatus;
  customSelectStatus: boolean;
  addBlogFormStatus: boolean;
  addBlogTitleInputValue: string;
  addBlogKeyWordInputValue: string;
  addBlogContentInputValue: string;
  randomlyFetchedImage: string;
  informStatus: boolean;
  displayPopupWindowStatus: boolean;
  displayBlogEditFormStatus: boolean;
  commentaryTextareaValue: string;
  deleteCommentaryPopupWindowStatus: boolean;
  setDataLoaderStatus: (newStatus: DataLoaderStatus) => void;
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
  dataLoaderStatus: 'idle',
  customSelectStatus: false,
  addBlogFormStatus: false,
  addBlogTitleInputValue: '',
  addBlogKeyWordInputValue: '',
  addBlogContentInputValue: '',
  randomlyFetchedImage: '',
  informStatus: false,
  displayPopupWindowStatus: false,
  displayBlogEditFormStatus: false,
  commentaryTextareaValue: '',
  deleteCommentaryPopupWindowStatus: false,
  setDataLoaderStatus: (newStatus: DataLoaderStatus) => newStatus,
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
  const { user } = useContext(AuthContext);
  const [dataLoaderStatus, setDataLoaderStatus] =
    useState<DataLoaderStatus>('idle');
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
    try {
      const response = await axios.get(`${baseUrl}/blogs/getblogs`);
      if (response) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        failureToast(error.response?.data.message);
      }
    }
  };

  const fetchFavorites = async (userID: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/blogs/getfavorites?userID=${userID}`
      );
      if (response) {
        setFavoriteBlogs(response.data.favoriteBlogs);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        console.log(error);
        failureToast(error.response?.data.message);
      }
    }
  };

  const postBlog = async (newBlogValues: BlogPostingValues) => {
    setDataLoaderStatus('posting');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/addblog`,
        newBlogValues
      );
      if (response) {
        fetchBlogs();
        notificationToast(response.data.message);
        setAddBlogFormStatus(false);
        setAddBlogTitleInputValue('');
        setAddBlogKeyWordInputValue('');
        setAddBlogContentInputValue('');
        setRandomlyFetchedImage('');
      }
    } catch (error) {
      setDataLoaderStatus('idle');
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        failureToast(error.response?.data.message);
      }
    } finally {
      setDataLoaderStatus('idle');
    }
  };

  const toggleBlogLiking = async (blogLikingRequestBody: BlogLikingValues) => {
    setDataLoaderStatus('rating');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/liking`,
        blogLikingRequestBody
      );
      if (response) {
        fetchBlogs();
        fetchFavorites(user!.userID);
        notificationToast(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        console.log(error);
        failureToast(error.response?.data.message);
      }
    } finally {
      setDataLoaderStatus('idle');
    }
  };

  const deleteBlog = async (blogID: string) => {
    setDataLoaderStatus('deleting');
    try {
      const response = await axios.post(`${baseUrl}/blogs/delete-blog`, {
        blogID,
      });
      if (response) {
        setDisplayPopupWindowStatus(false);
        setInformStatus(true);
        fetchBlogs();
        notificationToast(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        console.log(error);
        failureToast(error.response?.data.message);
      }
    } finally {
      setDataLoaderStatus('idle');
    }
  };

  const editBlog = async (newBlogValues: EditBlogPostingValues) => {
    setDataLoaderStatus('editing');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/edit-blog`,
        newBlogValues
      );
      if (response) {
        fetchBlogs();
        setDisplayBlogEditFormStatus(false);
        notificationToast(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        console.log(error);
        failureToast(error.response?.data.message);
      }
    } finally {
      setDataLoaderStatus('idle');
    }
  };

  const postCommentary = async (newCommentary: CommentaryValues) => {
    setDataLoaderStatus('posting');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/post-commentary`,
        newCommentary
      );
      if (response) {
        fetchBlogs();
        setCommentrayTextareaValue('');
        notificationToast(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        console.log(error);
        failureToast(error.response?.data.message);
      }
    } finally {
      setDataLoaderStatus('idle');
    }
  };

  const deleteCommentary = async (blogID: string, commentaryID: string) => {
    setDataLoaderStatus('deleting');
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
        const response = await fetch(
          `${baseUrl}/blogs/delete-commentary`,
          requestOptions
        );
        if (response) {
          fetchBlogs();
          setDeleteCommentaryPopupWindowStatus(false);
          notificationToast('Commentary successfully deleted!');
        }
      } catch (err) {
        const error = err as Error;
        failureToast(error.message);
      } finally {
        setDataLoaderStatus('idle');
      }
    }
  };

  const editCommentary = async (editedCommentaryBody: EditCommentaryValues) => {
    setDataLoaderStatus('editing');
    try {
      const response = await axios.post(
        `${baseUrl}/blogs/edit-commentary`,
        editedCommentaryBody
      );
      if (response) {
        fetchBlogs();
        notificationToast(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === 404) {
        failureToast('Unexpected error occurred. Try again later, please!');
      } else if (error instanceof AxiosError && error.request.status === 500) {
        console.log(error);
        failureToast(error.response?.data.message);
      }
    } finally {
      setDataLoaderStatus('idle');
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
