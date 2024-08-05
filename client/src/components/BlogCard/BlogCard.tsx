import styles from './BlogCard.module.scss';
import { FiThumbsUp } from 'react-icons/fi';
import { AiOutlineRead } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

export const BlogCard = () => {
  return (
    <NavLink className={styles.main_blog_card_box} to={'/profile'}>
      <div className={styles.blog_card_image_box}>
        <img
          className={styles.blog_image}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJmGQU-YJkAWvjqyS0zA6Ul5zqRPNBK_8YA&s"
          alt="blog_card_image"
        />
      </div>
      <div className={styles.blog_card_details_box}>
        <h4 className={styles.blog_card_title}>Blog Title</h4>
        <h5 className={styles.blog_card_author}>by: Delia Bartov</h5>
        <p className={styles.blog_card_text_body}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Consequuntur, alias aspernatur nemo voluptatibus dicta fuga alias
          aspernatur nemo voluptatibus dicta fuga.
        </p>
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
