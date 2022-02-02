import React, { createContext, useContext } from 'react';
import { useAsapStateStateManager } from './hooks/useAsapStateStateManager';
import { useAsapAuthStateManager } from './hooks/useAsapAuthStateManager';
import { useAsapUserStateManager } from './hooks/useAsapUserStateManager';
import { useAsapAppointmentsStateManager } from './hooks/useAsapAppointmentsStateManager';

const AsapContext = createContext({});

const AsapContextProvider = ({ children }) => {
    const asapStateState = useAsapStateStateManager();
    const asapAuthState = useAsapAuthStateManager();
    const asapUserState = useAsapUserStateManager();
    const asapAppointmentsState = useAsapAppointmentsStateManager();

    const asapStateModel = {
        ...asapStateState,
        ...asapAuthState,
        ...asapUserState,
        ...asapAppointmentsState,
    };

    return <AsapContext.Provider value={asapStateModel}>{children}</AsapContext.Provider>;
};

export default AsapContextProvider;

export const useAsapContext = () => useContext(AsapContext);
