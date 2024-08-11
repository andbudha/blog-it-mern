import { useContext, useEffect } from 'react';
import styles from './MyFavorites.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import { NavLink } from 'react-router-dom';

export const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const { blogs, favoriteBlogs, fetchFavorites } = useContext(DataContext);

  const favoriteBlogsGrid = favoriteBlogs?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));
  useEffect(() => {
    fetchFavorites(user!.userID);
  }, []);

  return (
    <div className={styles.main_myfavorites_box}>
      {!favoriteBlogs?.length ? (
        <div className={styles.info_box}>
          <h2 className={styles.info_text}>No Favorite Blogs Added</h2>
          <NavLink className={styles.home_button} to={'/'}>
            main
          </NavLink>
        </div>
      ) : (
        favoriteBlogsGrid
      )}
    </div>
  );
};
