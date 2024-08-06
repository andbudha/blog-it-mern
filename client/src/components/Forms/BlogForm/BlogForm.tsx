import { ChangeEvent, FocusEvent, useContext, useState } from 'react';
import styles from './BlogForm.module.scss';
import { DataContext } from '../../../contexts/DataContext';
import { CommonBlogFormValues } from '../../../types/common_types';

export const BlogForm = () => {
  const {
    addBlogTitleInputValue,
    addBlogKeyWordInputValue,
    addBlogContentInputValue,
    setAddBlogFormStatus,
    setAddBlogTitleInputValue,
    setAddBlogKeyWordInputValue,
    setAddBlogContentInputValue,
  } = useContext(DataContext);
  const [titleInputError, setTitleInputError] = useState<boolean>(false);
  const [keyWordInputError, setKeyWordInputError] = useState<boolean>(false);
  const [contentInputError, setContentInputError] = useState<boolean>(false);

  const blogFormValues: CommonBlogFormValues = {
    title: addBlogTitleInputValue,
    keyWord: addBlogKeyWordInputValue,
    content: addBlogContentInputValue,
  };

  const validate = (values: CommonBlogFormValues) => {
    const errors: CommonBlogFormValues = {
      title: '',
      keyWord: '',
      content: '',
    };

    if (!values.title) {
      errors.title = 'Blog-title is required!';
    }
    if (!values.keyWord) {
      errors.keyWord = 'Blog key-word is required!';
    }
    if (!values.content) {
      errors.content = 'Blog content is required!';
    }
    return errors;
  };

  const validation = validate(blogFormValues);
  const discardAddBlogFormValuesHandler = () => {
    setAddBlogTitleInputValue('');
    setAddBlogKeyWordInputValue('');
    setAddBlogContentInputValue('');
    setAddBlogFormStatus(false);
  };
  const catchingTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAddBlogTitleInputValue(e.currentTarget.value);
  };
  const catchingKeyWordInputValueHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setAddBlogKeyWordInputValue(e.currentTarget.value);
  };
  const catchingKeyWordOnBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (addBlogKeyWordInputValue) {
      console.log(addBlogKeyWordInputValue);
    }
  };
  const catchingTextAreaValueHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddBlogContentInputValue(e.currentTarget.value);
  };
  return (
    <div className={styles.main_blog_form_box}>
      <div className={styles.blog_form_box}>
        <div className={styles.blog_form_input_box}>
          {titleInputError && validation.title ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.title}</span>
            </div>
          ) : (
            <label className={styles.label}>Blog title</label>
          )}
          <input
            value={addBlogTitleInputValue}
            onChange={catchingTitleInputValueHandler}
            type="text"
            placeholder="Blog title..."
            className={styles.blog_form_input}
          />
        </div>{' '}
        <div className={styles.blog_form_input_box}>
          {keyWordInputError && validation.keyWord ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.keyWord}</span>
            </div>
          ) : (
            <label className={styles.label}>Blog key-word</label>
          )}
          <input
            value={addBlogKeyWordInputValue}
            onChange={catchingKeyWordInputValueHandler}
            onBlur={catchingKeyWordOnBlurHandler}
            type="text"
            placeholder="Blog key-word..."
            className={styles.blog_form_input}
          />
        </div>
        <div className={styles.blog_form_text_area_box}>
          {contentInputError && validation.content ? (
            <div className={styles.error_text_box}>
              <span className={styles.error_text}>{validation.content}</span>
            </div>
          ) : (
            <label className={styles.label}>Blog content</label>
          )}
          <textarea
            value={addBlogContentInputValue}
            onChange={catchingTextAreaValueHandler}
            placeholder="Blog content..."
            className={styles.blog_form_text_area}
          />
        </div>
        <div className={styles.blog_form_button_box}>
          <div className={styles.post_blog_button}>post blog</div>
          <div
            className={styles.discard_changes_button}
            onClick={discardAddBlogFormValuesHandler}
          >
            discard blog
          </div>
        </div>
      </div>
    </div>
  );
};
