"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface TrackingParams {
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface LeadModalOptions {
  origem?: string;
  conversionLabel?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
}

interface LeadContextType {
  isOpen: boolean;
  pendingUrl: string;
  openLeadModal: (url: string, options?: LeadModalOptions) => void;
  closeLeadModal: () => void;
  tracking: TrackingParams;
  options: LeadModalOptions;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");
  const [options, setOptions] = useState<LeadModalOptions>({});
  const [tracking, setTracking] = useState<TrackingParams>({
    gclid: null,
    fbclid: null,
    msclkid: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const newTracking = {
      gclid: params.get("gclid"),
      fbclid: params.get("fbclid"),
      msclkid: params.get("msclkid"),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
    };

    if (Object.values(newTracking).some(val => val !== null)) {
      setTracking(newTracking);
      sessionStorage.setItem("unum_tracking", JSON.stringify(newTracking));
    } else {
      const saved = sessionStorage.getItem("unum_tracking");
      if (saved) {
        try {
          setTracking(JSON.parse(saved));
        } catch (e) {
          console.error("Erro ao carregar tracking", e);
        }
      }
    }
  }, []);

  const openLeadModal = (url: string, options: LeadModalOptions = {}) => {
    setPendingUrl(url);
    setOptions(options);
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
    setPendingUrl("");
    setOptions({});
  };

  return (
    <LeadContext.Provider value={{ isOpen, pendingUrl, openLeadModal, closeLeadModal, tracking, options }}>
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
