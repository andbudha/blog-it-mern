import { BlogCard } from '../../components/BlogCard/BlogCard';
import styles from './Blogs.module.scss';

export const Blogs = () => {
  return (
    <div className={styles.main_blogs_box}>
      <BlogCard /> <BlogCard /> <BlogCard /> <BlogCard /> <BlogCard />{' '}
      <BlogCard /> <BlogCard /> <BlogCard />
    </div>
  );
};
