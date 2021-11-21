import React, { createContext, useContext } from 'react';
import { useAsapStateStateManager } from './hooks/useAsapStateStateManager';
import { useAsapAuthStateManager } from './hooks/useAsapAuthStateManager';
import { useAsapUserStateManager } from './hooks/useAsapUserStateManager';

const AsapContext = createContext({});

const AsapContextProvider = ({ children }) => {
    const asapStateState = useAsapStateStateManager();
    const asapAuthState = useAsapAuthStateManager();
    const asapUserState = useAsapUserStateManager();

    const asapStateModel = {
        ...asapStateState,
        ...asapAuthState,
        ...asapUserState,
    };

    return <AsapContext.Provider value={asapStateModel}>{children}</AsapContext.Provider>;
};

export default AsapContextProvider;

export const useAsapContext = () => useContext(AsapContext);
