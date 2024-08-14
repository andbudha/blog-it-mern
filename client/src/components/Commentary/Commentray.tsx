import { FiEdit3, FiX, FiCheck } from 'react-icons/fi';
import { CommentaryValues } from '../../types/common_types';
import styles from './Commentray.module.scss';
import { MdOutlineDelete } from 'react-icons/md';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { AuthLoader } from '../Loaders/AuthLoader/AuthLoader';
import { EditCommentaryTextarea } from '../Forms/EditCommentaryTextarea/EditCommentaryTextArea';
import { notificationToast } from '../../assets/toasts/notificationToast';

type CommentaryProps = {
  commentary: CommentaryValues;
};
export const Commentary = ({ commentary }: CommentaryProps) => {
  const { user, authLoaderStatus } = useContext(AuthContext);
  const { deleteCommentary } = useContext(DataContext);
  const [showEditTextarea, setShowEditTextarea] = useState<boolean>(false);
  const date = new Date(commentary.createdAt!).toLocaleDateString();
  const time = new Date(commentary.createdAt!).toLocaleTimeString();
  console.log(showEditTextarea);

  const changeEditTextareaStatusHandler = () => {
    setShowEditTextarea(true);
  };
  const deleteCommentaryHandler = (blogID: string, commentaryID: string) => {
    deleteCommentary(blogID, commentaryID);
  };

  const saveCommentaryChangesHandler = () => {
    notificationToast('Changes saved!');
  };
  const discardCommentaryChangesHandler = () => {
    setShowEditTextarea(false);
  };
  return (
    <div className={styles.main_commentary_box}>
      {user?.userID === commentary.userID &&
        authLoaderStatus === 'deleting' && <AuthLoader />}
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
                onClick={saveCommentaryChangesHandler}
              >
                <FiCheck className={styles.save_changes_icon} />
              </button>
            ) : (
              <button className={styles.edit_commentary_button}>
                <FiEdit3
                  className={styles.edit_icon}
                  onClick={changeEditTextareaStatusHandler}
                />
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
      {showEditTextarea ? (
        <EditCommentaryTextarea commentary={commentary} />
      ) : (
        <div className={styles.commentary_body_box}>
          <p className={styles.commentary_body}>{commentary.commentary}</p>
        </div>
      )}
      <div className={styles.commentary_footer_box}>
        <p className={styles.commentary_date}>
          {time}, {date}
        </p>
      </div>
    </div>
  );
};
