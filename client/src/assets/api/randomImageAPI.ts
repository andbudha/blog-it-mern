import axios from 'axios';

export const randomImageAPI = {
  fetchImage: (term: string) => {
    return axios.get(`https://api.unsplash.com/search/photos`, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
      },
      params: {
        query: term,
        orientation: 'landscape',
      },
    });
  },
};
