"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface EnquiryModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <EnquiryModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  return useContext(EnquiryModalContext);
}
