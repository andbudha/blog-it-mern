import styles from './BlogCard.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineRead } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { BlogResponse } from '../../types/common_types';
import { blogAlternativeImage } from '../../assets/utils/blogAlternativeImage';

type BlogCardProps = {
  blog: BlogResponse;
};
export const BlogCard = ({ blog }: BlogCardProps) => {
  const splitBlogCardContent = blog.content.slice(0, 220);

  return (
    <NavLink className={styles.main_blog_card_box} to={`/blog/${blog._id}`}>
      <div className={styles.blog_card_image_box}>
        <img
          className={styles.blog_image}
          src={blog.image ? blog.image : blogAlternativeImage}
        />
      </div>
      <div className={styles.blog_card_details_box}>
        <div className={styles.blog_card_title_box}>
          <h4 className={styles.blog_card_title}>{blog.title}</h4>
        </div>
        <div className={styles.blog_card_author_box}>
          <h5 className={styles.blog_card_author}>
            by {blog.user.firstName} {blog.user.lastName}
          </h5>
        </div>
        <div className={styles.blog_card_text_body_box}>
          <p className={styles.blog_card_text_body}>
            {splitBlogCardContent}...
          </p>
        </div>
      </div>
      <div className={styles.blog_card_bottom_box}>
        {' '}
        <div className={styles.likes_box}>
          <FaRegHeart className={styles.like_icon} />
          <div className={styles.likes_amount}>{blog.likes.length}</div>
        </div>
        <div className={styles.read_more_box}>
          <AiOutlineRead className={styles.book_icon} />
        </div>
      </div>
    </NavLink>
  );
};
