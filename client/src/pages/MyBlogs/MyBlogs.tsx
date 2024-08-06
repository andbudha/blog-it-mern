import { useContext } from 'react';
import styles from './MyBlogs.module.scss';
import { DataContext } from '../../contexts/DataContext';
import { BlogForm } from '../../components/Forms/BlogForm/BlogForm';

export const MyBlogs = () => {
  const { addBlogFormStatus, setAddBlogFormStatus } = useContext(DataContext);

  const changeBlogFormStatusHandler = () => {
    setAddBlogFormStatus(true);
  };
  return (
    <div className={styles.main_my_blogs_box}>
      {addBlogFormStatus ? (
        <BlogForm />
      ) : (
        <div className={styles.my_blogs_info_box}>
          <h2>No Blogs Added.</h2>
          <h2>Feel Free To Add One.</h2>
          <div
            className={styles.add_blog_button_box}
            onClick={changeBlogFormStatusHandler}
          >
            <h4>add blog</h4>
          </div>
        </div>
      )}
    </div>
  );
};
