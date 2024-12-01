"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../../../../shared/types";

type DataContextType = {
  setData: (data: string[]) => void;
  data: string[];
  setCurrentUser: (user: User) => void;
  currentUser: User;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Array<string>>([]);
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  return (
    <DataContext.Provider
      value={{
        setData,
        data,
        setCurrentUser,
        currentUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
