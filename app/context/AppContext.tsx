import React, { createContext, ReactNode, useEffect, useState } from 'react';

// Define the type of items — in this case, strings
type SavedItem = string;

interface AppContextType {
  saved: SavedItem[];
  addItem: (item: SavedItem) => void;
  removeItem: (item: SavedItem) => void;
  isSaved: (item: SavedItem) => boolean;
  setSaved: React.Dispatch<React.SetStateAction<SavedItem[]>>;
  setEmailContext: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [email, setEmailContext] = useState<string>('')

  useEffect(()=> {
    const 
  }, [saved])

  const addItem = (item: SavedItem) => {
    setSaved(prev => [...prev, item]);
  };

  const removeItem = (item: SavedItem) => {
    setSaved(prev => prev.filter(i => i !== item));
  };

  const isSaved = (item: string) => {
    return saved.includes(item);
  };

  return (
    <AppContext.Provider value={{ saved, isSaved, addItem, removeItem, setSaved, setEmailContext }}>
      {children}
    </AppContext.Provider>
  );
};