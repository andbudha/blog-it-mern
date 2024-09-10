import { useContext, useEffect } from 'react';
import styles from './MyFavorites.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthLoader } from '../../components/Loaders/AuthLoader/AuthLoader';

export const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const { favoriteBlogs, fetchFavorites } = useContext(DataContext);
  const { pathname } = useLocation();

  const favoriteBlogsGrid = favoriteBlogs?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));
  useEffect(() => {
    fetchFavorites(user!.userID);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.main_myfavorites_box}>
      {!favoriteBlogs?.length ? (
        <div className={styles.info_box}>
          {!favoriteBlogs?.length ? (
            <AuthLoader />
          ) : (
            <>
              <h2 className={styles.info_text}>No Favorite Blogs Added</h2>
              <NavLink className={styles.home_button} to={'/'}>
                main
              </NavLink>
            </>
          )}
        </div>
      ) : (
        favoriteBlogsGrid
      )}
    </div>
  );
};
