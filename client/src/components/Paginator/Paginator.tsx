import { useContext, useEffect } from 'react';
import styles from './Paginator.module.scss';
import { PaginationContext } from '../../contexts/PaginationContext';
import { Pagination } from '@mui/material';

export const Paginator = () => {
  const { numberOfPages, currentPage, setCurrentPage } =
    useContext(PaginationContext);

  useEffect(() => {}, [currentPage]);
  return (
    <div className={styles.pagination_main_box}>
      <div className={styles.pagination_box}>
        <Pagination
          shape="rounded"
          size={'medium'}
          count={numberOfPages}
          page={currentPage}
          color="secondary"
          onChange={(_: any, pageNumber: number) => setCurrentPage(pageNumber)}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#fc6736',
              fontWeight: '600',
              fontFamily: 'Poppins',
              boxShadow:
                '#fc6736 0px 0px 6px 0px,rgba(0, 0, 0, 0.06) 0px 0px 0px 0px',
            },
            '& .MuiPaginationItem-root:hover': {
              color: '#fff',
              backgroundColor: '#fc6736',
            },
            '& .Mui-selected': {
              backgroundColor: '#fc6736 !important',
              color: '#fff',
            },
          }}
        />
      </div>
    </div>
  );
};
