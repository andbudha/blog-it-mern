import { FiEdit3 } from 'react-icons/fi';
import { BlogResponse } from '../../types/common_types';
import styles from './Commentray.module.scss';
import { MdOutlineDelete } from 'react-icons/md';

type CommentaryProps = {
  blog: BlogResponse | undefined;
};
export const Commentary = ({ blog }: CommentaryProps) => {
  return (
    <div className={styles.main_commentary_box}>
      <div className={styles.secondary_commentary_author_box}>
        <div className={styles.commentary_author_box}>
          <div className={styles.author_image_box}>
            <img
              className={styles.author_image}
              src={blog?.user.profileImage}
              alt="author image"
            />
          </div>
          <div className={styles.author_full_name_box}>
            <p>{blog?.user.firstName}</p>
            <p>{blog?.user.lastName}</p>
          </div>
        </div>
        <div className={styles.commentary_manage_box}>
          <button className={styles.edit_commentary_button_box}>
            {' '}
            <FiEdit3 className={styles.edit_icon} />
          </button>
          <button className={styles.remove_commentary_button_box}>
            {' '}
            <MdOutlineDelete className={styles.remove_icon} />
          </button>
        </div>
      </div>
      <div className={styles.commentary_body_box}>
        <p className={styles.commentary_body}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla saepe
          neque eius non corporis sunt eveniet accusantium sequi quam veritatis!
        </p>
      </div>
      <div className={styles.commentary_footer_box}>
        <p className={styles.commentary_date}>4:07:26 PM, 8/12/2024</p>
      </div>
    </div>
  );
};
