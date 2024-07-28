import { useContext, useState } from 'react';
import styles from './ProfileEditForm.module.scss';
import { DataContext } from '../../../contexts/DataContext';
import { TbChevronDown } from 'react-icons/tb';

export const ProfileEditForm = () => {
  const { setActiveEditForm } = useContext(DataContext);
  const [customSelectStatus, setCustomSelecttatus] = useState<boolean>(false);

  const discardChangesHandler = () => {
    setActiveEditForm(false);
  };
  return (
    <div className={styles.main_profile_edit_form_box}>
      <div className={styles.edit_form_box}>
        <div className={styles.edit_profile_input_box}>
          <label className={styles.label}>First-name</label>
          <input
            type="text"
            placeholder="your first-name..."
            className={styles.edit_profile_input}
          />
        </div>
        <div className={styles.edit_profile_input_box}>
          <label className={styles.label}>Last-name</label>
          <input
            type="text"
            placeholder="your last-tname..."
            className={styles.edit_profile_input}
          />
        </div>
        <div className={styles.edit_profile_input_box}>
          <label className={styles.label}>Age</label>
          <input
            type="text"
            placeholder="your age..."
            className={styles.edit_profile_input}
          />
        </div>
        <div className={styles.edit_profile_custom_select}>
          <div className={styles.default_select_value_box}>
            {' '}
            Martital-status{' '}
            <TbChevronDown className={styles.chevron_down_icon} />
          </div>
          <div className={styles.select_option_box}>
            {' '}
            <div className={styles.select_option}>Single</div>
            <div className={styles.select_option}>Married</div>
          </div>
        </div>
      </div>
      <div className={styles.edit_form_button_box}>
        {' '}
        <div className={styles.save_changes_button}>save</div>
        <div
          className={styles.discard_changes_button}
          onClick={discardChangesHandler}
        >
          discard
        </div>
      </div>
    </div>
  );
};
