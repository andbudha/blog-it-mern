import { createContext, ReactNode } from 'react';

type PaginationContextType = {};
const initialPaginationContextState = {} as PaginationContextType;
export const PaginationContext = createContext(initialPaginationContextState);

type PaginationProviderProps = { children: ReactNode };

export const PaginationProvider = ({ children }: PaginationProviderProps) => {
  return (
    <PaginationContext.Provider value={{}}>
      {children}
    </PaginationContext.Provider>
  );
};
