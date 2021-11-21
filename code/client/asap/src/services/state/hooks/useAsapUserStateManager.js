import { useCallback, useState } from 'react';

const asapUserInitialState = {};

export const useAsapUserStateManager = () => {
    const [asapUser, setAsapUser] = useState(asapUserInitialState);

    const updateAsapUser = useCallback(updatedAsapUser => {
        setAsapUser(currentAsapUser => ({ ...currentAsapUser, ...updatedAsapUser }));
    }, []);

    return { asapUser, updateAsapUser };
};
