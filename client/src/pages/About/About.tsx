import { TypeAnimation } from 'react-type-animation';
import styles from './About.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { blogAlternativeImage } from '../../assets/utils/blogAlternativeImage';
import { NavLink } from 'react-router-dom';

export const About = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.main_about_box}>
      <div className={styles.blog_image_box}>
        <img
          src={blogAlternativeImage}
          alt="blog-image"
          className={styles.blog_image}
        />
      </div>
      <div className={styles.about_box}>
        <div className={styles.about_info_box}>
          <p className={styles.guest_greeting}>
            Dear{' '}
            <span className={styles.guest}>
              {user ? user.firstName : 'guest'}
            </span>
            ,
          </p>
          <p className={styles.type_animation}>
            <TypeAnimation
              sequence={[
                'welcome to blog_it website, a place where you can share your mind as blogs, go through blogs created by others, comment on blogs and add various blogs as your favorites.',
                2500,
              ]}
              wrapper="span"
              speed={1}
              repeat={Infinity}
            />
          </p>
        </div>
        <div className={styles.blogs_button_box}>
          <NavLink className={styles.blogs_button} to={'/blogs'}>
            blogs
          </NavLink>
        </div>
      </div>
    </div>
  );
};
