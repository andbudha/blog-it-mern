import { createContext, ReactNode, useContext, useState } from 'react';
import { DataContext } from './DataContext';
import { BlogResponse } from '../types/common_types';

type PaginationContextType = {
  currentPage: number;
  numberOfPages: number;
  setCurrentPage: (pageNumber: number) => void;
  blogsToDisplayPerPage: undefined | BlogResponse[];
};
type PaginationProviderProps = { children: ReactNode };

const initialPaginationContextState = {
  currentPage: 0,
  numberOfPages: 0,
  setCurrentPage: (pageNumber: number) => pageNumber,
  blogsToDisplayPerPage: [] as BlogResponse[],
} as PaginationContextType;

export const PaginationContext = createContext(initialPaginationContextState);

export const PaginationProvider = ({ children }: PaginationProviderProps) => {
  const { blogs } = useContext(DataContext);

  const blogsPerPage = 6;
  const numberOfPages = Math.ceil(blogs ? blogs.length / blogsPerPage : 0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const start = blogsPerPage * (currentPage - 1);
  const end = start + blogsPerPage;
  const blogsToDisplayPerPage = blogs?.slice(start, end);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        numberOfPages,
        setCurrentPage,
        blogsToDisplayPerPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

// type PaginationContextType = {};
// const initialPaginationContextState = {} as PaginationContextType;
// export const PaginationContext = createContext(initialPaginationContextState);

// type PaginationProviderProps = { children: ReactNode };

// export const PaginationProvider = ({ children }: PaginationProviderProps) => {
//   return (
//     <PaginationContext.Provider value={{}}>
//       {children}
//     </PaginationContext.Provider>
//   );
// };
