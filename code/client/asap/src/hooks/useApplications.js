import { useIntl } from 'react-intl';
import React, { useCallback, useEffect, useState } from 'react';
import { useAsapContext } from '../services/state/AsapContextProvider';
import { NEW_APPLICATION, ROLES } from '../constants';
import apiService from '../services/api/api';
import classNames from 'classnames';
import rootStyle from '../style/Asap.module.css';
import ApplicationLink from '../components/shared/ApplicationLink';
import useAuth from '../services/auth/hooks/useAuth';
import {ASAP_DEPT_HEAD_EDIT_APPLICATION,APPLICATION_VIEW} from "../services/routing/routes";

const _toApplications = (role, applications) => applications.map(application => toApplication(role, application));

const toApplication = (role, application) => {
    const date = new Date(Date.parse(application.created_at));
    const timezoneDate = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
    const steps = application.steps.length;
    const applyStep = application.steps[0];
    const currentStep = application.steps[steps - 1];
    return {
        id: application.id,
        creatorName: `${application.creator.user.first_name} ${application.creator.user.last_name}`,
        candidateName: `${application.applicant.user.first_name} ${application.applicant.user.last_name}`,
        currentRank: application.applicant.rank.name,
        currentRankNumber: application.applicant.rank.id,
        candidateId: application.applicant.user.id,
        requestedRankName: application.desired_rank.name,
        requestedRankId: application.desired_rank.id,
        cvFileName: application.application_state.cv_filename,
        letterFileName: application.application_state.letter_filename,
        submissionDate: timezoneDate.toLocaleString('he-IL'),
        stepName: currentStep.step_name,
        department: application.applicant.department.name,
        canCancel: role === ROLES.ASAP_DEPT_HEAD ? applyStep.can_cancel : currentStep.can_cancel,
        canUpdate: role === ROLES.ASAP_DEPT_HEAD ? applyStep.can_update : currentStep.can_update,
    };
};

const useApplications = () => {
    const { formatMessage } = useIntl();
    const { primaryRole } = useAuth();
    const { asapAppointments, updateAsapAppointments } = useAsapContext();
    const [columns, setColumns] = useState([]);
    const { currentApplicationId = NEW_APPLICATION } = asapAppointments;
    const currentApplicationState = asapAppointments[currentApplicationId];
    const wantedRoute = ASAP_DEPT_HEAD_EDIT_APPLICATION

    const localizeApplication = useCallback(
        application => ({
            ...application,
            stepName: formatMessage({ id: `appointment-steps.${application.stepName}` }),
        }),
        [formatMessage]
    );


    useEffect(() => {
        if (currentApplicationId !== NEW_APPLICATION && !currentApplicationState) {
            apiService.ApplicationService.getApplication(currentApplicationId).then(response => {
                const applicationState = localizeApplication(toApplication(primaryRole, response));
                updateAsapAppointments({ [currentApplicationId]: applicationState });
            });
        }
    }, [currentApplicationId, currentApplicationState, localizeApplication, updateAsapAppointments, primaryRole]);

    const toApplications = useCallback(
        applications => _toApplications(primaryRole, applications).map(application => localizeApplication(application)),
        [localizeApplication, primaryRole]
    );

    useEffect(() => {
        const columns = [
            {
                field: 'candidateName',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.candidate' }),
                flex: 1,
            },
            {
                field: 'requestedRankName',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.rank' }),
                flex: 0.6,
            },
            {
                field: 'submissionDate',
                type: 'date',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.submission-date' }),
                flex: 1,
                cellClassName: classNames(rootStyle.appointmentsDateCell),
            },
            {
                field: 'stepName',
                align: 'center',
                headerAlign: 'center',
                disableColumnMenu: true,
                headerName: formatMessage({ id: 'applications.stage-name' }),
                flex: 1,
            },
            {
                field: 'actions',
                align: 'center',
                headerAlign: 'center',
                disableColumnMenu: true,
                headerName: formatMessage({ id: 'applications.actions' }),
                flex: 0.5,
                renderCell: data => [
                    <ApplicationLink
                        key={'a'}
                        applicationId={data.row.id}
                        canUpdate={data.row.canUpdate}
                        actionsButton="actions-button.editText"
                        wantedRoute={ASAP_DEPT_HEAD_APPLICATION}
                    />,
                    <ApplicationLink
                        key={'view'}
                        applicationId={data.row.id}
                        canUpdate={data.row.canUpdate}
                        actionsButton="actions-button.view"
                        wantedRoute={APPLICATION_VIEW}
                    />,
                ],
            },
        ];
        if (primaryRole === ROLES.ASAP_ADMIN || ROLES.ASAP_APPT_CHAIR) {
            columns.splice(0, null, {
                field: 'creatorName',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.responsible' }),
                flex: 1,
            });
        }
        setColumns(columns);
    }, [formatMessage, primaryRole]);

    return {
        toApplications,
        currentApplicationState,
        asapAppointments,
        updateAsapAppointments,
        currentApplicationId,
        columns,
    };
};

export default useApplications;
