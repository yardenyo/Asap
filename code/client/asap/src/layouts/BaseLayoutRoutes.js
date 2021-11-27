import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import PrivateRoute from '../services/routing/PrivateRoute';
import useRouting from '../services/routing/hooks/useRouting';

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

const BaseLayoutRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { routesMetadataForRole } = useRouting();
    const routes = useMemo(() => routesPerRole(routesMetadataForRole), [routesMetadataForRole]);

    useEffect(() => {
        location.hash === '' && navigate(routesMetadataForRole[0].path, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Routes>{routes}</Routes>;
};

export default BaseLayoutRoutes;
