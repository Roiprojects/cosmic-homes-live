"use client";
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import FileManager from "@/components/ui/FileManager";

interface FileManagerContextValue {
  openFileManager: (onSelect?: (url: string) => void) => void;
}

const FileManagerContext = createContext<FileManagerContextValue>({
  openFileManager: () => {},
});

const SELECTED_URL_KEY = "cosmic-homes-selected-image-url";

export function FileManagerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [onSelect, setOnSelect] = useState<(url: string) => void>(() => () => {});

  const openFileManager = useCallback((callback?: (url: string) => void) => {
    if (callback) setOnSelect(() => callback);
    setIsOpen(true);
  }, []);

  const handleSelect = useCallback(
    (url: string) => {
      if (onSelect) onSelect(url);
      try {
        localStorage.setItem(SELECTED_URL_KEY, url);
        navigator.clipboard?.writeText(url).catch(() => {});
      } catch {
        // localStorage or clipboard not available
      }
    },
    [onSelect]
  );

  return (
    <FileManagerContext.Provider value={{ openFileManager }}>
      {children}
      <FileManager
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />
    </FileManagerContext.Provider>
  );
}

export function useFileManager() {
  return useContext(FileManagerContext);
}

export function useSelectedImageUrl() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SELECTED_URL_KEY);
      if (stored) setUrl(stored);
    } catch {
      // localStorage not available
    }
  }, []);

  return url;
}
