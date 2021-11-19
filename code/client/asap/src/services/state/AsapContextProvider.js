import React, { createContext, useContext } from 'react';
import { useAsapStateStateManager } from './hooks/useAsapStateStateManager';
import { useAsapAuthStateManager } from './hooks/useAsapAuthStateManager';

const AsapContext = createContext({});

const AsapContextProvider = ({ children }) => {
    const asapStateState = useAsapStateStateManager();
    const asapAuthState = useAsapAuthStateManager();

    const asapStateModel = {
        ...asapStateState,
        ...asapAuthState,
    };

    return <AsapContext.Provider value={asapStateModel}>{children}</AsapContext.Provider>;
};

export default AsapContextProvider;

export const useAsapContext = () => useContext(AsapContext);
