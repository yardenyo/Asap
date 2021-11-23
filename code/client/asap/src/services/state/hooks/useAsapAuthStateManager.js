import useLocalStorageState from 'use-local-storage-state';
import { getFromLocalStorage, STORAGE_ASAP_AUTH_STATE } from '../../storage/storage';
import { useCallback } from 'react';

const asapAuthInitialState = getFromLocalStorage(STORAGE_ASAP_AUTH_STATE) || {};

export const useAsapAuthStateManager = () => {
    const [asapAuth, setAsapAuth] = useLocalStorageState(STORAGE_ASAP_AUTH_STATE, asapAuthInitialState);

    const updateAsapAuth = useCallback(
        updatedAsapAuthState => {
            setAsapAuth(currentAsapAuthState => ({ ...currentAsapAuthState, ...updatedAsapAuthState }));
        },
        [setAsapAuth]
    );

    return { asapAuth, updateAsapAuth };
};
