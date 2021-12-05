import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { useAsapContext } from '../../state/AsapContextProvider';
import { getRoutesForRole } from '../routing-utils';
import PrivateRoute from '../PrivateRoute';

const routesPerRole = routesMetadataForRole =>
    routesMetadataForRole.map(({ id, path, Component }) => (
        <Route
            key={id}
            path={path}
            element={
                <PrivateRoute>
                    <Component />
                </PrivateRoute>
            }
        />
    ));

const useRouting = () => {
    const {
        asapUser: { roles },
    } = useAsapContext();
    const primaryRole = roles && roles[0];
    const routesMetadataForRole = useMemo(() => getRoutesForRole(primaryRole), [primaryRole]);

    const routes = useMemo(() => routesPerRole(routesMetadataForRole), [routesMetadataForRole]);
    const initialRoute = routesMetadataForRole[0]?.path;

    return { routes, routesMetadataForRole, initialRoute };
};

export default useRouting;
