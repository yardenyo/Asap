import Login from '../../components/auth/Login';
import AsapAdminApplications from '../../components/asap-admin/AsapAdminApplications';
import AsapDeptHeadAppointments from '../../components/asap-dept-head/Applications';
import AsapDeptHeadAppointment from '../../components/asap-dept-head/Application';
import AsapApptChairAppointments from '../../components/asap-appt-chair/Appointments';
import AsapAdminEditRequest from '../../components/asap-admin/EditRequest';
import { ROLES } from '../../constants';

const ROUTE_LOGIN = 'login';
const ASAP_ADMIN_APPOINTMENTS = 'appointments';
const ASAP_ADMIN_EDIT_REQUEST = 'request';
export const ASAP_DEPT_HEAD_APPOINTMENTS = 'appointments';
export const ASAP_DEPT_HEAD_APPOINTMENT = 'appointment';
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
        Component: AsapAdminApplications,
        isProtected: true,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-admin-appointments',
    },
    {
        id: ASAP_ADMIN_EDIT_REQUEST,
        path: `/${ASAP_ADMIN_EDIT_REQUEST}/:id`,
        Component: AsapAdminEditRequest,
        isProtected: true,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-admin-edit-request',
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
    {
        id: ASAP_DEPT_HEAD_APPOINTMENT,
        path: `/${ASAP_DEPT_HEAD_APPOINTMENT}/:id`,
        Component: AsapDeptHeadAppointment,
        isProtected: true,
        roles: [ROLES.ASAP_DEPT_HEAD],
        i18nKey: 'routes.asap-dept-head-appointment',
    },
];
