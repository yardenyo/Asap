import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../services/routing/PrivateRoute';
import { ROUTES } from '../services/routing/routes';

const routes = ROUTES.map(({ id, path, Component }) => (
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

const BaseLayoutRoutes = () => <Routes>{routes}</Routes>;

export default BaseLayoutRoutes;
