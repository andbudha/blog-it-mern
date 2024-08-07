import styles from './BlogCard.module.scss';
import { FiThumbsUp } from 'react-icons/fi';
import { AiOutlineRead } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { BlogResponse } from '../../types/common_types';

type BlogCardProps = {
  blog: BlogResponse;
};
export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <NavLink className={styles.main_blog_card_box} to={'/blog'}>
      <div className={styles.blog_card_image_box}>
        <img className={styles.blog_image} src={blog.image} />
      </div>
      <div className={styles.blog_card_details_box}>
        <h4 className={styles.blog_card_title}>{blog.title}</h4>
        <h5 className={styles.blog_card_author}>
          by: {blog.user.firstName} {blog.user.lastName}
        </h5>
        <pre className={styles.blog_card_text_body}>{blog.content}</pre>
      </div>
      <div className={styles.blog_card_bottom_box}>
        {' '}
        <div className={styles.likes_box}>
          <FiThumbsUp className={styles.like_icon} />
          <div className={styles.likes_amount}>35</div>
        </div>
        <div className={styles.read_more_box}>
          <AiOutlineRead className={styles.book_icon} />
        </div>
      </div>
    </NavLink>
  );
};
