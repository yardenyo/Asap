import { useCallback, useState } from 'react';

const asapDeptHeadInitialState = {};

export const useAsapDeptHeadStateManager = () => {
    const [asapDeptHead, setAsapDeptHead] = useState(asapDeptHeadInitialState);

    const updateAsapDeptHead = useCallback(updatedAsapDeptHead => {
        setAsapDeptHead(currentAsapDeptHead => ({ ...currentAsapDeptHead, ...updatedAsapDeptHead }));
    }, []);

    return { asapDeptHead, updateAsapDeptHead };
};
