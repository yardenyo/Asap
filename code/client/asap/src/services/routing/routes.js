import Login from '../../components/auth/Login';
import AsapAdminApplications from '../../components/asap-admin/Applications';
import AsapAdminApplication from '../../components/asap-admin/Application';
import AsapAdminApplicationView from '../../components/asap-admin/ApplicationView';
import AsapDeptHeadApplications from '../../components/asap-dept-head/Applications';
import AsapDeptHeadApplication from '../../components/asap-dept-head/Application';
import AsapDeptHeadEditApplication from '../../components/asap-dept-head/EditApplication';
import AsapDeptMemberApplication from '../../components/asap-dept-member/Application';
import AsapDeptMemberApplicationView from '../../components/asap-dept-member/ApplicationView';
import AsapApptChairApplications from '../../components/asap-appt-chair/Applications';
import AsapApptChairApplication from '../../components/asap-appt-chair/Application';

import { ROLES } from '../../constants';

const ROUTE_LOGIN = 'login';

export const ASAP_ADMIN_APPLICATIONS = 'admin-applications';
export const ASAP_ADMIN_APPLICATION = 'admin-edit-application';
export const ASAP_ADMIN_APPLICATION_VIEW = 'admin-application/view';

export const ASAP_DEPT_HEAD_APPLICATIONS = 'dh-applications';
export const ASAP_DEPT_HEAD_NEW_APPLICATION = 'dh-new-application';
export const ASAP_DEPT_HEAD_EDIT_APPLICATION = 'dh-edit-application';

export const ASAP_APPT_CHAIR_APPLICATIONS = 'ap-applications';
export const ASAP_APPT_CHAIR_EDIT_APPLICATION = 'ap-edit-application';

export const ASAP_DEPT_MEMBER_APPLICATION = 'member-new-application';
export const ASAP_DEPT_MEMBER_APPLICATION_VIEW = 'member-application/view';

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
        id: ASAP_DEPT_MEMBER_APPLICATION,
        path: `/${ASAP_DEPT_MEMBER_APPLICATION}`,
        Component: AsapDeptMemberApplication,
        isProtected: true,
        roles: [ROLES.ASAP_DEPT_MEMBER],
        i18nKey: 'routes.asap-dept-member-appointment',
    },
    {
        id: ASAP_ADMIN_APPLICATIONS,
        path: `/${ASAP_ADMIN_APPLICATIONS}`,
        Component: AsapAdminApplications,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-admin-appointments',
    },
    {
        id: ASAP_ADMIN_APPLICATION,
        path: `/${ASAP_ADMIN_APPLICATION}/:id`,
        Component: AsapAdminApplication,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-admin-edit-request',
    },
    {
        id: ASAP_APPT_CHAIR_APPLICATIONS,
        path: `/${ASAP_APPT_CHAIR_APPLICATIONS}`,
        Component: AsapApptChairApplications,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_APPT_CHAIR],
        i18nKey: 'routes.asap-appt-chair-appointments',
    },
    {
        id: ASAP_APPT_CHAIR_EDIT_APPLICATION,
        path: `/${ASAP_APPT_CHAIR_EDIT_APPLICATION}/:id`,
        Component: AsapApptChairApplication,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_APPT_CHAIR],
        i18nKey: 'routes.asap-appt-chair-edit-request',
    },
    {
        id: ASAP_DEPT_HEAD_APPLICATIONS,
        path: `/${ASAP_DEPT_HEAD_APPLICATIONS}`,
        Component: AsapDeptHeadApplications,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_DEPT_HEAD],
        i18nKey: 'routes.asap-dept-head-appointments',
    },
    {
        id: ASAP_DEPT_HEAD_NEW_APPLICATION,
        path: `/${ASAP_DEPT_HEAD_NEW_APPLICATION}`,
        Component: AsapDeptHeadApplication,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_DEPT_HEAD],
        i18nKey: 'routes.asap-dept-head-appointment',
    },
    {
        id: ASAP_DEPT_HEAD_EDIT_APPLICATION,
        path: `/${ASAP_DEPT_HEAD_EDIT_APPLICATION}/:id`,
        Component: AsapDeptHeadEditApplication,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_DEPT_HEAD, ROLES.ASAP_APPT_CHAIR, ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-dept-head-edit-appointment',
    },
    {
        id: ASAP_DEPT_MEMBER_APPLICATION_VIEW,
        path: `/${ASAP_DEPT_MEMBER_APPLICATION_VIEW}/:id`,
        Component: AsapDeptMemberApplicationView,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_DEPT_MEMBER],
        i18nKey: 'routes.asap-appointment-view',
    },
    {
        id: ASAP_ADMIN_APPLICATION_VIEW,
        path: `/${ASAP_ADMIN_APPLICATION_VIEW}/:id`,
        Component: AsapAdminApplicationView,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-appointment-view',
    },
];
