import type { ReactNode } from 'react';
import type React from 'react';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';

import { loadSores } from '../services/firestoreService';
import type { CankerSore } from '../types';

interface UIContextProps {
  sores: CankerSore[];
  setSores: React.Dispatch<React.SetStateAction<CankerSore[]>>;
  selectedSore: CankerSore | null;
  setSelectedSore: React.Dispatch<React.SetStateAction<CankerSore | null>>;
}

interface UIProviderProps {
  children: ReactNode;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [sores, setSores] = useState<CankerSore[]>([]);
  const [selectedSore, setSelectedSore] = useState<CankerSore | null>(null);

  useEffect(() => {
    const fetchSores = async () => {
      const activeSores = await loadSores('activesores');
      setSores(activeSores);
    };

    fetchSores();
  }, []);

  const contextValue = useMemo(
    () => ({
      sores,
      setSores,
      selectedSore,
      setSelectedSore,
    }),
    [sores, setSores, selectedSore, setSelectedSore]
  );

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export const useUIContext = (): UIContextProps => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
