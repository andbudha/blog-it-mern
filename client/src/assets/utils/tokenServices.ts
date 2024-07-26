const getToken = () => {
  const token = localStorage.getItem('blog-it-token');
  return token ? token : null;
};
const removeToken = () => {
  localStorage.removeItem('blog-it-token');
};

export { getToken, removeToken };
