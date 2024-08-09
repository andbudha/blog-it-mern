import { useParams } from 'react-router';
import styles from './DetailedBlog.module.scss';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { PiUserLight } from 'react-icons/pi';
import { blogAlternativeImage } from '../../assets/utils/blogAlternativeImage';

export const DetailedBlog = () => {
  const { blogID } = useParams();
  const { blogs } = useContext(DataContext);
  const blog = blogs?.find((blog) => blog._id === blogID);
  const date = new Date(blog?.createdAt!).toLocaleDateString();
  const time = new Date(blog?.createdAt!).toLocaleTimeString();
  console.log(blog);

  return (
    <div className={styles.main_detailed_blog_box}>
      <div className={styles.detailed_blog_box}>
        <div className={styles.blog_image_box}>
          <img
            className={styles.blog_image}
            src={blog?.image ? blog.image : blogAlternativeImage}
            alt="blog cover image"
          />
        </div>

        <div className={styles.blog_title_box}>
          <h2>{blog?.title}</h2>
        </div>
        <div className={styles.blog_content_box}>
          <p>{blog?.content}</p>
        </div>
        <div className={styles.blog_footer_box}>
          <div className={styles.details_box}>
            <div className={styles.user_full_name_box}>
              <p>
                by {blog?.user.firstName} {blog?.user.lastName}
              </p>
            </div>
            <div className={styles.blog_date_box}>
              <p>
                {time}, {date}
              </p>
            </div>
          </div>
          <div className={styles.user_profile_image_box}>
            {blog?.user.profileImage ? (
              <img
                className={styles.user_profile_image}
                src={blog?.user.profileImage}
                alt=""
              />
            ) : (
              <PiUserLight className={styles.user_icon} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.comment_text_area_box}>
        <textarea
          className={styles.comment_text_area}
          placeholder="Feel free to leave a commentary..."
        />
        <button className={styles.post_comment_button}>post</button>
      </div>
    </div>
  );
};
