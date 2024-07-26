const getToken = () => {
  return localStorage.getItem('blog-it-token') ? true : false;
};

const removeToken = () => {
  localStorage.removeItem('blog-it-token');
};

export { getToken, removeToken };
