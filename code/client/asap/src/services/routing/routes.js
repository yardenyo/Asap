import Login from '../../components/auth/Login';
import AsapAdminAppointments from '../../components/asap-admin/AsapAdminAppointments';
import AsapDeptHeadAppointments from '../../components/asap-dept-head/Appointments';
import AsapApptChairAppointments from '../../components/asap-appt-chair/Appointments';
import { ROLES } from '../../constants';

const ROUTE_LOGIN = 'login';
const ASAP_ADMIN_APPOINTMENTS = 'appointments';
const ASAP_DEPT_HEAD_APPOINTMENTS = 'appointments';
const ASAP_APPT_CHAIR_APPOINTMENTS = 'appointments';

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
        id: ASAP_ADMIN_APPOINTMENTS,
        path: `/${ASAP_ADMIN_APPOINTMENTS}`,
        Component: AsapAdminAppointments,
        isProtected: true,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-admin-appointments',
    },
    {
        id: ASAP_APPT_CHAIR_APPOINTMENTS,
        path: `/${ASAP_APPT_CHAIR_APPOINTMENTS}`,
        Component: AsapApptChairAppointments,
        isProtected: true,
        roles: [ROLES.ASAP_APPT_CHAIR],
        i18nKey: 'routes.asap-appt-chair-appointments',
    },
    {
        id: ASAP_DEPT_HEAD_APPOINTMENTS,
        path: `/${ASAP_DEPT_HEAD_APPOINTMENTS}`,
        Component: AsapDeptHeadAppointments,
        isProtected: true,
        roles: [ROLES.ASAP_DEPT_HEAD],
        i18nKey: 'routes.asap-dept-head-appointments',
    },
];
