import ContentLoader from 'react-content-loader';
import styles from './BlogSkeleton.module.scss';

export const BlogSkeleton = () => {
  return (
    <div className={styles.main_blog_card_box}>
      <ContentLoader
        speed={2}
        width={380}
        height={440}
        viewBox="0 0 380 440"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="11" y="404" rx="0" ry="0" width="50" height="26" />
        <rect x="310" y="404" rx="0" ry="0" width="50" height="26" />
        <rect x="7" y="253" rx="0" ry="0" width="360" height="102" />
        <rect x="260" y="305" rx="0" ry="0" width="3" height="13" />
        <rect x="232" y="315" rx="0" ry="0" width="0" height="1" />
        <rect x="8" y="227" rx="0" ry="0" width="130" height="20" />
        <rect x="9" y="200" rx="0" ry="0" width="130" height="20" />
        <rect x="0" y="-1" rx="0" ry="0" width="382" height="184" />
        <rect x="327" y="134" rx="0" ry="0" width="2" height="12" />
      </ContentLoader>
    </div>
  );
};
