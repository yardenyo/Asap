import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { getRoutesForRole } from '../routing-utils';
import PrivateRoute from '../PrivateRoute';
import useAuth from '../../auth/hooks/useAuth';

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
    const { primaryRole } = useAuth();

    const routesMetadataForRole = useMemo(() => getRoutesForRole(primaryRole), [primaryRole]);

    const routes = useMemo(() => routesPerRole(routesMetadataForRole), [routesMetadataForRole]);
    const initialRoute = routesMetadataForRole[0]?.path;

    return { routes, routesMetadataForRole, initialRoute };
};

export default useRouting;
