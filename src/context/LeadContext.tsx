"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LeadContextType {
  isOpen: boolean;
  pendingUrl: string;
  openLeadModal: (url: string) => void;
  closeLeadModal: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  const openLeadModal = (url: string) => {
    setPendingUrl(url);
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
    setPendingUrl("");
  };

  return (
    <LeadContext.Provider value={{ isOpen, pendingUrl, openLeadModal, closeLeadModal }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLead must be used within a LeadProvider");
  }
  return context;
}
