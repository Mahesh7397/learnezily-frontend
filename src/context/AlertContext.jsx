"use client";
import GlobalAlert from "@/component/GlobalAlert";
import { createContext, useContext, useState } from "react";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "info", duration = 3000) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <GlobalAlert {...alert} />}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
