'use client';

import {createContext, useContext, useState} from 'react';
import {Park} from '../types/park-types';

interface ParksContextType {
    parks: Park[] | null;
    setParks: (parks: Park[] | null) => void;
}

const ParksContext = createContext<ParksContextType | undefined>(undefined);

export function ParksProvider({children}: {children: React.ReactNode}) {
    const [parks, setParks] = useState<Park[] | null>(null);

    return <ParksContext.Provider value={{parks, setParks}}>{children}</ParksContext.Provider>;
}

export function useParksContext() {
    const context = useContext(ParksContext);
    if (!context) {
        throw new Error('useParksContext must be used within a ParksProvider');
    }
    return context;
}
