import { useContext } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './Blogs.module.scss';
import { DataContext } from '../../contexts/DataContext';

export const Blogs = () => {
  const { blogs } = useContext(DataContext);

  const blogGrid = blogs?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));
  return <div className={styles.main_blogs_box}>{blogGrid}</div>;
};
