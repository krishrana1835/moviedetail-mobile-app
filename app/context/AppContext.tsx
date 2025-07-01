import { changeSaved } from "@/services/api";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";

// Define the type of items — in this case, strings
type SavedItem = string;

interface AppContextType {
  saved: SavedItem[];
  email: string;
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
  const [email, setEmailContext] = useState<string>("");

  useEffect(() => {
    const syncWithServer = async () => {
      if (email.trim()) {
        try {
          const response = await changeSaved(email, saved);
          if (!response) {
            Alert.alert("Error", "Server error");
          }
        } catch (error) {
          console.log("Sync error:", error);
        }
      }
    };

    syncWithServer();
  }, [saved]);

  const addItem = (item: SavedItem) => {
    setSaved((prev) => [...prev, item]);
  };

  const removeItem = (item: SavedItem) => {
    setSaved((prev) => prev.filter((i) => i !== item));
  };

  const isSaved = (item: SavedItem) => {
    return email.trim() !== "" && saved.includes(item);
  };

  return (
    <AppContext.Provider
      value={{ saved, email, addItem, removeItem, isSaved, setSaved, setEmailContext }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider