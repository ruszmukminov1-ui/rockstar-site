// src/context/ModalContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/Product";
import { User } from "../types/User";

type ModalContextType = {
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isSupportOpen: boolean;
  openSupportModal: () => void;
  closeSupportModal: () => void;
  isOrderOpen: boolean;
  openOrderModal: (product: Product) => void;
  closeOrderModal: () => void;
  selectedProductForOrder: Product | null;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSupportOpen, setSupportOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const openAuthModal = () => setAuthOpen(true);
  const closeAuthModal = () => setAuthOpen(false);

  const openSupportModal = () => setSupportOpen(true);
  const closeSupportModal = () => setSupportOpen(false);

  const openOrderModal = (product: Product) => {
    setSelectedProductForOrder(product);
    setOrderOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedProductForOrder(null);
    setOrderOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isAuthOpen,
        openAuthModal,
        closeAuthModal,
        isSupportOpen,
        openSupportModal,
        closeSupportModal,
        openOrderModal,
        closeOrderModal,
        isOrderOpen,
        selectedProductForOrder,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }
  return context;
};
