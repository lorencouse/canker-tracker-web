import type { ReactNode } from 'react';
import type React from 'react';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

import type { CankerSore } from '../types';
import { checkDailyLogStatus } from '@/hooks/dailyLogManager';

interface UIContextProps {
  mode: 'view' | 'add' | 'edit' | 'update';
  setMode: React.Dispatch<
    React.SetStateAction<'view' | 'add' | 'edit' | 'update'>
  >;
  dailyLogCompleted: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  soresToUpdate: number;
  setSoresToUpdate: React.Dispatch<React.SetStateAction<number>>;
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
  const [mode, setMode] = useState<'view' | 'add' | 'edit' | 'update'>('view');
  const [dailyLogCompleted, setDailyLogCompleted] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [soresToUpdate, setSoresToUpdate] = useState<number>(0);
  const [sores, setSores] = useState<CankerSore[]>([]);
  const [selectedSore, setSelectedSore] = useState<CankerSore | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const result = await checkDailyLogStatus();
      setDailyLogCompleted(result);
    };

    checkStatus();
  }, []);

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      dailyLogCompleted,
      isDialogOpen,
      setIsDialogOpen,
      soresToUpdate,
      setSoresToUpdate,
      sores,
      setSores,
      selectedSore,
      setSelectedSore,
    }),
    [
      mode,
      setMode,
      dailyLogCompleted,
      isDialogOpen,
      setIsDialogOpen,
      soresToUpdate,
      setSoresToUpdate,
      sores,
      setSores,
      selectedSore,
      setSelectedSore,
    ]
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
