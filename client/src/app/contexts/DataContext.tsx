"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "types";

type DataContextType = {
  setCurrentUser: (user: User) => void;
  currentUser: User;
  setNotificationTimestamp: (timestamp: Date | null) => void;
  notificationTimestamp: Date | null;
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
  const [notificationTimestamp, setNotificationTimestamp] =
    useState<Date | null>(null);

  return (
    <DataContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        setNotificationTimestamp,
        notificationTimestamp,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
