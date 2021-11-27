import React, { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import useRouting from '../services/routing/hooks/useRouting';

const BaseLayoutRoutes = () => {
    const navigate = useNavigate();
    const { routes, initialRoute } = useRouting();

    useEffect(() => {
        if (!!initialRoute) {
            navigate(initialRoute, { replace: true });
        }
    }, [initialRoute, navigate]);

    return <Routes>{routes}</Routes>;
};

export default BaseLayoutRoutes;
