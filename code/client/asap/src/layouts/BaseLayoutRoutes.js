import React, { useEffect } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import useRouting from '../services/routing/hooks/useRouting';

const BaseLayoutRoutes = () => {
    const navigate = useNavigate();
    const { routes, initialRoute } = useRouting();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate(initialRoute, { replace: true });
        }
    }, [initialRoute, navigate, location.pathname]);

    return <Routes>{routes}</Routes>;
};

export default BaseLayoutRoutes;
