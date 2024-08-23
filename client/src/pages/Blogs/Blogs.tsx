import { useContext, useEffect } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './Blogs.module.scss';
import { PaginationContext } from '../../contexts/PaginationContext';
import { Paginator } from '../../components/Paginator/Paginator';
import { AuthLoader } from '../../components/Loaders/AuthLoader/AuthLoader';
import { DataContext } from '../../contexts/DataContext';

export const Blogs = () => {
  const { blogsToDisplayPerPage } = useContext(PaginationContext);
  const { setInformStatus } = useContext(DataContext);
  useEffect(() => {
    setInformStatus(false);
  }, []);
  const blogGrid = blogsToDisplayPerPage?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));
  return (
    <div className={styles.main_blogs_box}>
      <div className={styles.blogs_box}>
        {!blogGrid?.length ? <AuthLoader /> : blogGrid}
      </div>
      <div className={styles.paginator_box}>
        <Paginator />
      </div>
    </div>
  );
};
