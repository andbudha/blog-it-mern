import { Navigate, useParams } from 'react-router';
import styles from './DetailedBlog.module.scss';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { PiUserLight } from 'react-icons/pi';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { blogAlternativeImage } from '../../assets/utils/blogAlternativeImage';
import { AuthContext } from '../../contexts/AuthContext';
import { notificationToast } from '../../assets/toasts/notificationToast';
import { AuthLoader } from '../../components/Loaders/AuthLoader/AuthLoader';
import { BlogEditForm } from '../../components/Forms/BlogEditForm/BlogEditForm';
import { Commentary } from '../../components/Commentary/Commentray';
import { CommentaryTextarea } from '../../components/Forms/CommentaryTextarea/CommentaryTextarea';

export const DetailedBlog = () => {
  const { blogID } = useParams();
  const { user, authLoaderStatus } = useContext(AuthContext);
  const {
    displayBlogEditFormStatus,
    displayPopupWindowStatus,
    informStatus,
    blogs,
    editBlogTitleInputValue,
    editBlogContentInputValue,
    toggleBlogLiking,
    deleteBlog,
    setDisplayBlogEditFormStatus,
    setDisplayPopupWindowStatus,
  } = useContext(DataContext);

  const blog = blogs?.find((blog) => blog._id === blogID);
  const date = new Date(blog?.createdAt!).toLocaleDateString();
  const time = new Date(blog?.createdAt!).toLocaleTimeString();
  const liked = blog?.likes.filter((userID) => userID === user?.userID);

  const toggleLikeBlogHandler = () => {
    if (user) {
      const blogLikingRequestBody = {
        userID: user.userID,
        blogID: blog!._id,
      };
      toggleBlogLiking(blogLikingRequestBody);
      return;
    } else {
      notificationToast('Log in first, please!');
    }
  };
  const displayPopupWindowHandler = () => {
    setDisplayPopupWindowStatus(!displayPopupWindowStatus);
  };

  const deleteBlogHandler = (blogID: string) => {
    deleteBlog(blogID);
  };

  const displayBlogEditFormHandler = () => {
    setDisplayBlogEditFormStatus(!displayBlogEditFormStatus);
  };
  if (informStatus) {
    return <Navigate to={'/info-page'} />;
  }
  return (
    <div className={styles.main_detailed_blog_box}>
      {displayPopupWindowStatus && (
        <div className={styles.main_popup_box}>
          <div className={styles.popup_window}>
            {authLoaderStatus === 'deleting' && <AuthLoader />}
            <div className={styles.info_text_box}>
              <h3>This blog will be deleted!</h3>
            </div>
            <div className={styles.popup_window_button_box}>
              <div
                className={styles.delete_blog_button}
                onClick={() => deleteBlogHandler(blogID!)}
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
      {displayBlogEditFormStatus ? (
        <BlogEditForm blog={blog} />
      ) : (
        <div className={styles.detailed_blog_box}>
          <div className={styles.blog_image_box}>
            <img
              className={styles.blog_image}
              src={blog?.image ? blog.image : blogAlternativeImage}
              alt="blog cover image"
            />
          </div>

          <div className={styles.blog_title_box}>
            <h2>{editBlogTitleInputValue || blog?.title}</h2>
          </div>
          <div className={styles.blog_content_box}>
            <p>{editBlogContentInputValue || blog?.content}</p>
          </div>
          <div className={styles.blog_footer_box}>
            <div className={styles.footer_likes_box}>
              <div className={styles.thumb_up_icon_box}>
                {liked?.length === 1 ? (
                  <RiThumbUpFill
                    className={styles.thumb_up_icon}
                    onClick={toggleLikeBlogHandler}
                  />
                ) : (
                  <RiThumbUpLine
                    className={styles.thumb_up_icon}
                    onClick={toggleLikeBlogHandler}
                  />
                )}
              </div>
              <div className={styles.likes_amount_box}>
                {blog?.likes.length}
              </div>
            </div>
            <div className={styles.footer_info_box}>
              <div className={styles.details_box}>
                <div className={styles.user_full_name_box}>
                  <p>
                    by {blog?.user.firstName} {blog?.user.lastName}
                  </p>
                </div>
                <div className={styles.blog_date_box}>
                  <p>
                    {time}, {date}
                  </p>
                </div>
              </div>
              <div className={styles.user_profile_image_box}>
                {blog?.user.profileImage ? (
                  <img
                    className={styles.user_profile_image}
                    src={blog?.user.profileImage}
                    alt=""
                  />
                ) : (
                  <PiUserLight className={styles.user_icon} />
                )}
              </div>
            </div>
          </div>
          {user?.userID === blog?.user._id && (
            <div className={styles.manage_blog_box}>
              <div className={styles.manage_blog_button_box}>
                <div
                  className={styles.edit_blog_button}
                  onClick={displayBlogEditFormHandler}
                >
                  <FiEdit3 className={styles.edit_blog_icon} />
                </div>
                <div
                  className={styles.remove_blog_button}
                  onClick={displayPopupWindowHandler}
                >
                  <MdOutlineDelete className={styles.remove_blog_icon} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.main_commentary_text_area_box}>
        <CommentaryTextarea />
        {/* <div
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
        )} */}
      </div>
      <div className={styles.commentary_band_box}>
        <Commentary blog={blog} />
      </div>
    </div>
  );
};
