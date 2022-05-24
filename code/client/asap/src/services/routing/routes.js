import Login from '../../components/auth/Login';
import AsapAdminLandingPage from '../../components/asap-admin/LandingPage';
import AsapAdminApplications from '../../components/asap-admin/Applications';
import AsapAdminApplication from '../../components/asap-admin/Application';
import AsapAdminApplicationView from '../../components/asap-admin/ApplicationView';
import AsapDeptHeadApplications from '../../components/asap-dept-head/Applications';
import AsapDeptHeadApplication from '../../components/asap-dept-head/Application';
import AsapDeptHeadApplicationView from '../../components/asap-dept-head/ApplicationView';
import AsapDeptHeadEditApplication from '../../components/asap-dept-head/EditApplication';
import AsapDeptMemberApplication from '../../components/asap-dept-member/Application';
import AsapDeptMemberApplicationView from '../../components/asap-dept-member/ApplicationView';
import AsapDeptMemberEditApplication from '../../components/asap-dept-member/EditApplication';
import AsapApptChairApplications from '../../components/asap-appt-chair/Applications';
import AsapApptChairApplication from '../../components/asap-appt-chair/Application';
import AsapApptChairApplicationView from '../../components/asap-appt-chair/ApplicationView';
import AsapQualityDeptApplications from '../../components/asap-quality-dept/Applications';

import { ROLES } from '../../constants';

const ROUTE_LOGIN = 'login';

export const ASAP_ADMIN_LANDING_PAGE = 'admin';
export const ASAP_ADMIN_APPLICATIONS = 'applications';
export const ASAP_ADMIN_APPLICATION = 'edit-application';
export const ASAP_ADMIN_APPLICATION_VIEW = 'application/view';

export const ASAP_DEPT_HEAD_APPLICATIONS = 'applications';
export const ASAP_DEPT_HEAD_EDIT_APPLICATION = 'edit-application';
export const ASAP_DEPT_HEAD_APPLICATION_VIEW = 'application/view';
export const ASAP_DEPT_HEAD_NEW_APPLICATION = 'new-application';

export const ASAP_APPT_CHAIR_APPLICATIONS = 'applications';
export const ASAP_APPT_CHAIR_EDIT_APPLICATION = 'edit-application';
export const ASAP_APPT_CHAIR_APPLICATION_VIEW = 'application/view';

export const ASAP_DEPT_MEMBER_APPLICATION = 'new-application';
export const ASAP_DEPT_MEMBER_EDIT_APPLICATION = 'edit-application';
export const ASAP_DEPT_MEMBER_APPLICATION_VIEW = 'application/view';

export const ASAP_QUALITY_DEPT_APPLICATIONS = 'applications';

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
        id: ASAP_ADMIN_LANDING_PAGE,
        path: `/${ASAP_ADMIN_LANDING_PAGE}`,
        Component: AsapAdminLandingPage,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-admin-landing-page',
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
        id: ASAP_ADMIN_APPLICATION_VIEW,
        path: `/${ASAP_ADMIN_APPLICATION_VIEW}/:id`,
        Component: AsapAdminApplicationView,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_ADMIN],
        i18nKey: 'routes.asap-appointment-view',
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
        id: ASAP_DEPT_HEAD_EDIT_APPLICATION,
        path: `/${ASAP_DEPT_HEAD_EDIT_APPLICATION}/:id`,
        Component: AsapDeptHeadEditApplication,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_DEPT_HEAD],
        i18nKey: 'routes.asap-dept-head-edit-appointment',
    },
    {
        id: ASAP_DEPT_HEAD_APPLICATION_VIEW,
        path: `/${ASAP_DEPT_HEAD_APPLICATION_VIEW}/:id`,
        Component: AsapDeptHeadApplicationView,
        isProtected: true,
        isDisplayed: false,
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
        id: ASAP_APPT_CHAIR_APPLICATION_VIEW,
        path: `/${ASAP_APPT_CHAIR_APPLICATION_VIEW}/:id`,
        Component: AsapApptChairApplicationView,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_APPT_CHAIR],
        i18nKey: 'routes.asap-appointment-view',
    },
    {
        id: ASAP_DEPT_MEMBER_APPLICATION,
        path: `/${ASAP_DEPT_MEMBER_APPLICATION}`,
        Component: AsapDeptMemberApplication,
        isProtected: true,
        isDisplayed: false,
        roles: [ROLES.ASAP_DEPT_MEMBER],
        i18nKey: 'routes.asap-dept-member-appointment',
    },
    {
        id: ASAP_DEPT_MEMBER_EDIT_APPLICATION,
        path: `/${ASAP_DEPT_MEMBER_EDIT_APPLICATION}`,
        Component: AsapDeptMemberEditApplication,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_DEPT_MEMBER],
        i18nKey: 'routes.asap-dept-member-edit-appointment',
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
        id: ASAP_QUALITY_DEPT_APPLICATIONS,
        path: `/${ASAP_QUALITY_DEPT_APPLICATIONS}`,
        Component: AsapQualityDeptApplications,
        isProtected: true,
        isDisplayed: true,
        roles: [ROLES.ASAP_QUALITY_DEPT],
        i18nKey: 'routes.asap-quality-dept-appointments',
    },
];
