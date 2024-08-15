import { ChangeEvent, useContext, useState } from 'react';
import styles from './AddCommentaryTextarea.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { DataContext } from '../../../contexts/DataContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { useParams } from 'react-router';
import { notificationToast } from '../../../assets/toasts/notificationToast';

export const AddCommentaryTextarea = () => {
  const {
    commentaryTextareaValue,
    setCommentrayTextareaValue,
    postCommentary,
  } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { blogID } = useParams();
  const [displayTextareaStatus, setDisplayTextAreaStatus] =
    useState<boolean>(false);

  const displayTextareaHandler = () => {
    if (user) {
      setDisplayTextAreaStatus(!displayTextareaStatus);
    } else {
      notificationToast('Log in first, please!');
    }
  };

  const catchTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentrayTextareaValue(e.currentTarget.value);
  };
  const postCommentaryHandler = () => {
    const newCommentary = {
      blogID: blogID!,
      userID: user!.userID,
      profileImage: user!.profileImage,
      firstName: user!.firstName,
      lastName: user!.lastName,
      commentary: commentaryTextareaValue.trim(),
    };
    if (commentaryTextareaValue) {
      postCommentary(newCommentary);
    } else {
      notificationToast('Write a commentary first, please!');
    }
  };
  return (
    <div className={styles.commentary_text_area_box}>
      <div
        className={styles.display_textarea_button}
        onClick={displayTextareaHandler}
      >
        <h4>share your mind</h4>
        {displayTextareaStatus ? (
          <FaChevronUp className={styles.chevron_icon} />
        ) : (
          <FaChevronDown className={styles.chevron_icon} />
        )}
      </div>
      {displayTextareaStatus && (
        <>
          <textarea
            value={commentaryTextareaValue}
            className={styles.comment_text_area}
            placeholder="Feel free to leave a commentary..."
            onChange={catchTextareaHandler}
          />
          <button
            className={styles.post_comment_button}
            onClick={postCommentaryHandler}
          >
            post
          </button>
        </>
      )}
    </div>
  );
};
