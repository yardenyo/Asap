import React, { createContext, useContext } from 'react';
import { useAsapStateStateManager } from './hooks/useAsapStateStateManager';
import { useAsapAuthStateManager } from './hooks/useAsapAuthStateManager';
import { useAsapUserStateManager } from './hooks/useAsapUserStateManager';
import { useAsapDeptHeadStateManager } from './hooks/useAsapDeptHeadStateManager';

const AsapContext = createContext({});

const AsapContextProvider = ({ children }) => {
    const asapStateState = useAsapStateStateManager();
    const asapAuthState = useAsapAuthStateManager();
    const asapUserState = useAsapUserStateManager();
    const asapDeptHeadState = useAsapDeptHeadStateManager();

    const asapStateModel = {
        ...asapStateState,
        ...asapAuthState,
        ...asapUserState,
        ...asapDeptHeadState,
    };

    return <AsapContext.Provider value={asapStateModel}>{children}</AsapContext.Provider>;
};

export default AsapContextProvider;

export const useAsapContext = () => useContext(AsapContext);
