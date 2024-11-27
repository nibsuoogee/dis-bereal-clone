"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DataContextType = {
  setData: (data: string[]) => void;
  data: string[];
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

  return (
    <DataContext.Provider
      value={{
        setData,
        data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
