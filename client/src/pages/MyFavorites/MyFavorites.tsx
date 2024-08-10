import { useContext, useEffect } from 'react';
import styles from './MyFavorites.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { BlogCard } from '../../components/BlogCard/BlogCard';

export const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const { favoriteBlogs, fetchFavorites } = useContext(DataContext);

  const favoriteBlogsGrid = favoriteBlogs?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));
  useEffect(() => {
    fetchFavorites(user!.userID);
  }, []);
  return <div className={styles.main_myfavorites_box}>{favoriteBlogsGrid}</div>;
};
