import { FiEdit3, FiX, FiCheck } from 'react-icons/fi';
import { CommentaryValues } from '../../types/common_types';
import styles from './Commentray.module.scss';
import { MdOutlineDelete } from 'react-icons/md';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { AuthLoader } from '../Loaders/AuthLoader/AuthLoader';
import { notificationToast } from '../../assets/toasts/notificationToast';
import { PiUserLight } from 'react-icons/pi';

type CommentaryProps = {
  commentary: CommentaryValues;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user, allUsers, authLoaderStatus } = useContext(AuthContext);
  const {
    deleteCommentaryPopupWindowStatus,
    setDeleteCommentaryPopupWindowStatus,
    deleteCommentary,
    editCommentary,
  } = useContext(DataContext);
  const [showEditTextarea, setShowEditTextarea] = useState<boolean>(false);
  const [editCommentaryTextareaValue, setEditCommentaryTextareaValue] =
    useState<string>(commentary.commentary);

  const date = new Date(commentary.createdAt!).toLocaleDateString();
  const time = new Date(commentary.createdAt!).toLocaleTimeString();
  const profile = allUsers?.find(
    (profile) => profile._id === commentary.userID
  );
  console.log(profile);

  const changeEditTextareaStatusHandler = () => {
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
  const displayPopupWindowHandler = () => {
    setDeleteCommentaryPopupWindowStatus(!deleteCommentaryPopupWindowStatus);
  };
  return (
    <div className={styles.main_commentary_box}>
      {deleteCommentaryPopupWindowStatus && (
        <div className={styles.main_popup_box}>
          <div className={styles.popup_window}>
            {authLoaderStatus === 'deleting' && <AuthLoader />}
            <div className={styles.info_text_box}>
              <h3>Commentary will be deleted!</h3>
            </div>
            <div className={styles.popup_window_button_box}>
              <div
                className={styles.delete_blog_button}
                onClick={() =>
                  deleteCommentaryHandler(commentary.blogID, commentary._id!)
                }
              >
                delete
              </div>
              <div
                className={styles.cancel_delete_blog_button}
                onClick={displayPopupWindowHandler}
              >
                cancel
              </div>
            </div>
          </div>
        </div>
      )}
      {user?.userID === commentary.userID && authLoaderStatus === 'editing' && (
        <AuthLoader />
      )}

      <div className={styles.secondary_commentary_author_box}>
        <div className={styles.commentary_author_box}>
          <div className={styles.author_image_box}>
            {profile?.profileImage ? (
              <img
                className={styles.author_image}
                src={profile?.profileImage}
                alt="author image"
              />
            ) : (
              <PiUserLight className={styles.user_icon} />
            )}
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
                onClick={changeEditTextareaStatusHandler}
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
              <button
                className={styles.remove_commentary_button}
                onClick={displayPopupWindowHandler}
              >
                <MdOutlineDelete className={styles.remove_icon} />
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
            <p className={styles.commentary}>
              {editCommentaryTextareaValue || commentary.commentary}
            </p>
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
