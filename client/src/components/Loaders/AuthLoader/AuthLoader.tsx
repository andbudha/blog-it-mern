import styles from './AuthLoader.module.scss';

export const AuthLoader = () => {
  return (
    <div className={styles.main_loader_box}>
      <div className={styles.loader}></div>
    </div>
  );
};
