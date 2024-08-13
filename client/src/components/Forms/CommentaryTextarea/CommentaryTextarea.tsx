import { useState } from 'react';
import styles from './CommentaryTextarea.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

export const CommentaryTextarea = () => {
  const [displayTextareaStatus, setDisplayTextAreaStatus] =
    useState<boolean>(false);
  const displayTextareaHandler = () => {
    setDisplayTextAreaStatus(!displayTextareaStatus);
  };
  return (
    <div className={styles.commentary_text_area_box}>
      <div
        className={styles.display_textarea_button}
        onClick={displayTextareaHandler}
      >
        <h4>leave commentary</h4>
        {displayTextareaStatus ? (
          <FaChevronUp className={styles.chevron_icon} />
        ) : (
          <FaChevronDown className={styles.chevron_icon} />
        )}
      </div>
      {displayTextareaStatus && (
        <>
          <textarea
            className={styles.comment_text_area}
            placeholder="Feel free to leave a commentary..."
          />
          <button className={styles.post_comment_button}>post</button>
        </>
      )}
    </div>
  );
};
