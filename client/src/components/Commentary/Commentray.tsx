import { FiEdit3 } from 'react-icons/fi';
import { CommentaryValues } from '../../types/common_types';
import styles from './Commentray.module.scss';
import { MdOutlineDelete } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

type CommentaryProps = {
  commentary: CommentaryValues;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user } = useContext(AuthContext);
  const date = new Date(commentary.createdAt!).toLocaleDateString();
  const time = new Date(commentary.createdAt!).toLocaleTimeString();
  return (
    <div className={styles.main_commentary_box}>
      <div className={styles.secondary_commentary_author_box}>
        <div className={styles.commentary_author_box}>
          <div className={styles.author_image_box}>
            <img
              className={styles.author_image}
              src={commentary.profileImage}
              alt="author image"
            />
          </div>
          <div className={styles.author_full_name_box}>
            <p>{commentary.firstName}</p>
            <p>{commentary.lastName}</p>
          </div>
        </div>
        {commentary.userID === user?.userID && (
          <div className={styles.commentary_manage_box}>
            <button className={styles.edit_commentary_button_box}>
              <FiEdit3 className={styles.edit_icon} />
            </button>
            <button className={styles.remove_commentary_button_box}>
              <MdOutlineDelete className={styles.remove_icon} />
            </button>
          </div>
        )}
      </div>
      <div className={styles.commentary_body_box}>
        <p className={styles.commentary_body}>{commentary.commentary}</p>
      </div>
      <div className={styles.commentary_footer_box}>
        <p className={styles.commentary_date}>
          {time}, {date}
        </p>
      </div>
    </div>
  );
};
