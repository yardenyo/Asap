import { useAsapContext } from '../../state/AsapContextProvider';
import { getRoutesForRole } from '../routing-utils';

const useRouting = () => {
    const {
        asapUser: { roles },
    } = useAsapContext();

    const primaryRole = roles && roles[0];
    const routesMetadataForRole = getRoutesForRole(primaryRole);

    return { routesMetadataForRole };
};

export default useRouting;
