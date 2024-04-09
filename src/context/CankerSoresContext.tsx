import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CankerSore } from '../types';

interface CankerSoresContextType {
    selectedSore: CankerSore | null;
    setSelectedSore: (sore: CankerSore | null) => void;
}

const CankerSoresContext = createContext<CankerSoresContextType | undefined>(undefined);

export const CankerSoresProvider = ({ children }: { children: ReactNode }) => {
    const [selectedSore, setSelectedSore] = useState<CankerSore | null>(null);

    return (
        <CankerSoresContext.Provider value={{ selectedSore, setSelectedSore }}>
            {children}
        </CankerSoresContext.Provider>
    );
};

export const useCankerSores = (): CankerSoresContextType => {
    const context = useContext(CankerSoresContext);
    if (context === undefined) {
        throw new Error('useCankerSores must be used within a CankerSoresProvider');
    }
    return context;
};