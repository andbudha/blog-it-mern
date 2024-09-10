import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { DataContext } from '../../../contexts/DataContext';
import {
  CommonBlogFormValues,
  BlogResponse,
  EditBlogPostingValues,
} from '../../../types/common_types';
import styles from './BlogEditForm.module.scss';
import { AuthLoader } from '../../Loaders/AuthLoader/AuthLoader';
import { useLocation } from 'react-router';
import JoditEditor from 'jodit-react';
import { joditConfig } from '../../../assets/jodit_config';

type BlogEditFormProps = {
  blog: BlogResponse | undefined;
  editBlogTitleInputValue: string;
  editBlogContentInputValue: string;
  setEditBlogTitleInputValue: (updatedTitle: string) => void;
  setEditBlogContentInputValue: (updatedContent: string) => void;
};
export const BlogEditForm = ({
  blog,
  editBlogContentInputValue,
  editBlogTitleInputValue,
  setEditBlogTitleInputValue,
  setEditBlogContentInputValue,
}: BlogEditFormProps) => {
  const { dataLoaderStatus, setDisplayBlogEditFormStatus, editBlog } =
    useContext(DataContext);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setEditBlogTitleInputValue(blog!.title);
    setEditBlogContentInputValue(blog!.content);
  }, [pathname]);
  const [titleInputError, setTitleInputError] = useState<boolean>(false);
  const [contentInputError, setContentInputError] = useState<boolean>(false);

  const editBlogFormValues: CommonBlogFormValues = {
    title: editBlogTitleInputValue,
    content: editBlogContentInputValue,
  };

  const validate = (values: CommonBlogFormValues) => {
    const errors: CommonBlogFormValues = {
      title: '',
      content: '',
    };
    if (!values.title) {
      errors.title = 'Blog title is required!';
    }
    if (!values.content) {
      errors.content = 'Blog content is required!';
    }
    return errors;
  };

  const validation = validate(editBlogFormValues);

  const catchingTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditBlogTitleInputValue(e.currentTarget.value);
    if (validation.title.length === 0) {
      setTitleInputError(true);
    }
  };
  const catchJoditValueHandler = (newContent: string) => {
    setEditBlogContentInputValue(newContent);
    if (validation.content.length === 0) {
      setContentInputError(true);
    }
  };
  const saveBlogChangesHandler = () => {
    const blogValues: EditBlogPostingValues = {
      blogID: blog!._id,
      title: editBlogTitleInputValue,
      content: editBlogContentInputValue,
    };
    if (validation.title) {
      setTitleInputError(true);
    } else if (validation.content) {
      setContentInputError(true);
    } else if (validation.content && validation.title) {
      setTitleInputError(true);
      setContentInputError(true);
    } else if (!validation.title && !validation.content) {
      editBlog(blogValues);
    }
  };

  const discardBlogEditFormHandler = () => {
    setDisplayBlogEditFormStatus(false);
    setEditBlogTitleInputValue('');
    setEditBlogContentInputValue('');
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.blog_form_box}>
      {dataLoaderStatus === 'editing' && <AuthLoader />}
      <div className={styles.blog_form_input_box}>
        {titleInputError && validation.title ? (
          <div className={styles.error_text_box}>
            <span className={styles.error_text}>{validation.title}</span>
          </div>
        ) : (
          <label className={styles.label}>Blog title</label>
        )}
        <input
          value={editBlogTitleInputValue}
          onChange={catchingTitleInputValueHandler}
          type="text"
          placeholder="Blog title..."
          className={styles.blog_form_input}
        />
      </div>{' '}
      <div className={styles.blog_form_text_area_box}>
        {contentInputError && validation.content ? (
          <div className={styles.error_text_box}>
            <span className={styles.error_text}>{validation.content}</span>
          </div>
        ) : (
          <label className={styles.label}>Blog content</label>
        )}
        <JoditEditor
          value={editBlogContentInputValue}
          config={joditConfig().config}
          onChange={(newContent) => catchJoditValueHandler(newContent)}
        />
      </div>
      <div className={styles.blog_form_button_box}>
        <div
          className={styles.post_blog_button}
          onClick={saveBlogChangesHandler}
        >
          save
        </div>
        <div
          className={styles.discard_changes_button}
          onClick={discardBlogEditFormHandler}
        >
          discard
        </div>
      </div>
    </div>
  );
};
