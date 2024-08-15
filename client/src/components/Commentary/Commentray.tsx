import { FiEdit3, FiX, FiCheck } from 'react-icons/fi';
import { CommentaryValues } from '../../types/common_types';
import styles from './Commentray.module.scss';
import { MdOutlineDelete } from 'react-icons/md';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { AuthLoader } from '../Loaders/AuthLoader/AuthLoader';
import { notificationToast } from '../../assets/toasts/notificationToast';

type CommentaryProps = {
  commentary: CommentaryValues;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user, authLoaderStatus } = useContext(AuthContext);
  const { deleteCommentary, editCommentary } = useContext(DataContext);
  const [showEditTextarea, setShowEditTextarea] = useState<boolean>(false);
  const [editCommentaryTextareaValue, setEditCommentaryTextareaValue] =
    useState<string>(commentary.commentary);
  const date = new Date(commentary.createdAt!).toLocaleDateString();
  const time = new Date(commentary.createdAt!).toLocaleTimeString();

  const changeEditTextareaStatusHandler = (commentaryID: string) => {
    setShowEditTextarea(!showEditTextarea);
  };
  const deleteCommentaryHandler = (blogID: string, commentaryID: string) => {
    deleteCommentary(blogID, commentaryID);
  };
  const catchingEditCommentaryTextareaHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditCommentaryTextareaValue(e.currentTarget.value);
  };
  const saveCommentaryChangesHandler = (
    blogID: string,
    commentaryID: string
  ) => {
    const editedCommentaryBody = {
      blogID,
      commentaryID,
      newCommentary: editCommentaryTextareaValue.trim(),
    };
    if (editCommentaryTextareaValue.trim().length === 0) {
      notificationToast('Write a commentary first before posting!');
    } else {
      editCommentary(editedCommentaryBody);
      setShowEditTextarea(!showEditTextarea);
    }
  };
  const discardCommentaryChangesHandler = () => {
    setShowEditTextarea(!showEditTextarea);
    setEditCommentaryTextareaValue(commentary.commentary);
  };
  return (
    <div className={styles.main_commentary_box}>
      {(user?.userID === commentary.userID &&
        authLoaderStatus === 'deleting' && <AuthLoader />) ||
        (user?.userID === commentary.userID &&
          authLoaderStatus === 'editing' && <AuthLoader />)}

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
            {showEditTextarea ? (
              <button
                className={styles.save_commentary_changes_button}
                onClick={() =>
                  saveCommentaryChangesHandler(
                    commentary.blogID,
                    commentary._id!
                  )
                }
              >
                <FiCheck className={styles.save_changes_icon} />
              </button>
            ) : (
              <button
                className={styles.edit_commentary_button}
                onClick={() => changeEditTextareaStatusHandler(commentary._id!)}
              >
                <FiEdit3 className={styles.edit_icon} />
              </button>
            )}
            {showEditTextarea ? (
              <button
                className={styles.discard_commentary_changes_button}
                onClick={discardCommentaryChangesHandler}
              >
                <FiX className={styles.discard_changes_icon} />
              </button>
            ) : (
              <button className={styles.remove_commentary_button}>
                <MdOutlineDelete
                  className={styles.remove_icon}
                  onClick={() =>
                    deleteCommentaryHandler(commentary.blogID, commentary._id!)
                  }
                />
              </button>
            )}
          </div>
        )}
      </div>
      <div className={styles.commentary_body_box}>
        {showEditTextarea ? (
          <div className={styles.main_textarea_box}>
            <textarea
              value={editCommentaryTextareaValue}
              className={styles.textarea_box}
              onChange={catchingEditCommentaryTextareaHandler}
            />
          </div>
        ) : (
          <div className={styles.commentary_box}>
            {' '}
            <pre className={styles.commentary}>
              {editCommentaryTextareaValue || commentary.commentary}
            </pre>
          </div>
        )}
      </div>
      <div className={styles.commentary_footer_box}>
        <p className={styles.commentary_date}>
          {time}, {date}
        </p>
      </div>
    </div>
  );
};
