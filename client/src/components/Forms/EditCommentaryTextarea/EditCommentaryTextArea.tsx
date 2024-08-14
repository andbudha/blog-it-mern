import styles from './EditCommentaryTextarea.module.scss';

export const EditCommentaryTextarea = () => {
  return (
    <div className={styles.main_textarea_box}>
      <textarea className={styles.textarea_box} />
    </div>
  );
};
