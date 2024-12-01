"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../../../../shared/types";

type DataContextType = {
  setCurrentUser: (user: User) => void;
  currentUser: User;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * @description This is a custom hook that allows us to use the DataContext in any component
 * @returns DataContextType
 */
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  return (
    <DataContext.Provider
      value={{
        setCurrentUser,
        currentUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
