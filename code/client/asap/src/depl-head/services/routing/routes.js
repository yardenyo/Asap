import TestRoute1 from '../../components/TestRoute1';
import TestRoute2 from '../../components/TestRoute2';
import Login from '../../../shared/components/shared/auth/Login';

const ROUTE_LOGIN = 'login';
const ROUTE_1 = 'route-1';
const ROUTE_2 = 'route-2';

export const LOGIN_ROUTE = {
    id: ROUTE_LOGIN,
    path: `/${ROUTE_LOGIN}`,
    Component: Login,
};

export const ROUTES = [
    {
        id: ROUTE_1,
        path: `/${ROUTE_1}`,
        Component: TestRoute1,
    },
    {
        id: ROUTE_2,
        path: `/${ROUTE_2}`,
        Component: TestRoute2,
    },
];

export const DEFAULT_ROUTE = ROUTES[0];
