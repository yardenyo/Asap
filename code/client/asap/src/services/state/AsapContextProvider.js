import React, { createContext, useContext } from 'react';
import { useAsapStateStateManager } from './hooks/useAsapStateStateManager';

const AsapContext = createContext({});

const AsapContextProvider = ({ children }) => {
    const asapStateState = useAsapStateStateManager();

    const asapStateModel = {
        ...asapStateState,
    };

    return <AsapContext.Provider value={asapStateModel}>{children}</AsapContext.Provider>;
};

export default AsapContextProvider;

export const useAsapContext = () => useContext(AsapContext);
