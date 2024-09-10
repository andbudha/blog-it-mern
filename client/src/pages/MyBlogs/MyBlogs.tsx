import { useContext, useEffect } from 'react';
import styles from './MyBlogs.module.scss';
import { DataContext } from '../../contexts/DataContext';
import { BlogForm } from '../../components/Forms/BlogForm/BlogForm';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import { AuthContext } from '../../contexts/AuthContext';
import { IoAdd } from 'react-icons/io5';
import { useLocation } from 'react-router';

export const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const {
    blogs,
    addBlogFormStatus,
    setAddBlogFormStatus,
    setAddBlogTitleInputValue,
    setAddBlogKeyWordInputValue,
    setAddBlogContentInputValue,
    setInformStatus,
  } = useContext(DataContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setAddBlogTitleInputValue('');
    setAddBlogKeyWordInputValue('');
    setAddBlogContentInputValue('');
    setAddBlogFormStatus(false);
    setInformStatus(false);
  }, [pathname]);
  const filteredBlogs = blogs?.filter((blog) => blog.user._id === user?.userID);
  const myBlogs = filteredBlogs?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));

  const changeBlogFormStatusHandler = () => {
    setAddBlogFormStatus(true);
  };
  return (
    <div className={styles.main_my_blogs_box}>
      {!myBlogs?.length ? (
        <>
          {addBlogFormStatus ? (
            <BlogForm />
          ) : (
            <div className={styles.my_blogs_info_box}>
              <h2>No Blogs Posted Yet</h2>
              <div
                className={styles.add_blog_button}
                onClick={changeBlogFormStatusHandler}
              >
                <IoAdd className={styles.add_icon} />
                <h3>add blog</h3>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {addBlogFormStatus ? (
            <BlogForm />
          ) : (
            <div className={styles.my_blogs_box}>
              <div className={styles.my_blogs_grid_box}>
                <div
                  className={styles.add_blog_button}
                  onClick={changeBlogFormStatusHandler}
                >
                  <IoAdd className={styles.add_icon} />
                  <h3>add new blog</h3>
                </div>
                {myBlogs}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
