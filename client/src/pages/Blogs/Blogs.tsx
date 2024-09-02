import { useContext, useEffect } from 'react';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './Blogs.module.scss';
import { PaginationContext } from '../../contexts/PaginationContext';
import { Paginator } from '../../components/Paginator/Paginator';
import { DataContext } from '../../contexts/DataContext';
import { useLocation } from 'react-router';
import { BlogSkeleton } from '../../components/BlogSkeleton/BlogSkeleton';

export const Blogs = () => {
  const { blogsToDisplayPerPage } = useContext(PaginationContext);
  const { setInformStatus } = useContext(DataContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setInformStatus(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  const blogGrid = blogsToDisplayPerPage?.map((blog) => (
    <BlogCard key={blog._id} blog={blog} />
  ));

  const blogSkeletons = [...new Array(6)].map((_, i) => (
    <BlogSkeleton key={i} />
  ));
  return (
    <div className={styles.main_blogs_box}>
      <div className={styles.blogs_box}>
        {!blogGrid?.length ? blogSkeletons : blogGrid}
      </div>
      <div className={styles.paginator_box}>
        <Paginator />
      </div>
    </div>
  );
};
