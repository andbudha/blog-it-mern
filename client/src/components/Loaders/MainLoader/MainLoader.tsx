import styles from './MainLoader.module.scss';

export const MainLoader = () => {
  return (
    <div className={styles.main_loader_box}>
      <div className={styles.loader}></div>
    </div>
  );
};
