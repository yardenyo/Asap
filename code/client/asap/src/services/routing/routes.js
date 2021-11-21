import Login from '../../components/auth/Login';
import TestRoute1 from '../../components/TestRoute1';
import TestRoute2 from '../../components/TestRoute2';
import { ROLES } from '../../constants';

const ROUTE_LOGIN = 'login';
const ROUTE_1 = 'route-1';
const ROUTE_2 = 'route-2';

export const LOGIN_ROUTE = {
    id: ROUTE_LOGIN,
    path: `/${ROUTE_LOGIN}`,
    Component: Login,
    isProtected: false,
    roles: [],
};

export const ROUTES = [
    LOGIN_ROUTE,
    {
        id: ROUTE_1,
        path: `/${ROUTE_1}`,
        Component: TestRoute1,
        isProtected: true,
        roles: [ROLES.ASAP_ADMIN],
    },
    {
        id: ROUTE_2,
        path: `/${ROUTE_2}`,
        Component: TestRoute2,
        isProtected: true,
        roles: [ROLES.ASAP_ADMIN, ROLES.ASAP_DEPT_HEAD],
    },
];

export const DEFAULT_ROUTE = ROUTES[0];
