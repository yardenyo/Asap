import { useIntl } from 'react-intl';
import React, { useCallback, useEffect, useState } from 'react';
import { useAsapContext } from '../services/state/AsapContextProvider';
import { NEW_APPLICATION, ROLES } from '../constants';
import apiService from '../services/api/api';
import classNames from 'classnames';
import rootStyle from '../style/Asap.module.css';
import ApplicationLink from '../components/asap-dept-head/ApplicationLink';
import useAuth from '../services/auth/hooks/useAuth';

const _toApplications = applications => applications.map(application => toApplication(application));

const toApplication = application => {
    const date = new Date(Date.parse(application.created_at));
    const timezoneDate = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
    const steps = application.steps.length;
    const currentStep = application.steps[steps - 1];
    return {
        id: application.id,
        creatorName: `${application.creator.user.first_name} ${application.creator.user.last_name}`,
        candidateName: `${application.applicant.user.first_name} ${application.applicant.user.last_name}`,
        candidateId: application.applicant.user.id,
        requestedRankName: application.desired_rank.name,
        requestedRankId: application.desired_rank.id,
        submissionDate: timezoneDate.toLocaleString('he-IL'),
        stepNumber: steps,
        stepName: currentStep.step_name,
        canCancel: currentStep.can_cancel,
        canUpdate: currentStep.can_update,
    };
};

const useApplications = () => {
    const { formatMessage } = useIntl();
    const { primaryRole } = useAuth();
    const { asapAppointments, updateAsapAppointments } = useAsapContext();
    const [columns, setColumns] = useState([]);
    const { currentApplicationId = NEW_APPLICATION } = asapAppointments;
    const currentApplicationState = asapAppointments[currentApplicationId];

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
                const applicationState = localizeApplication(toApplication(response));
                updateAsapAppointments({ [currentApplicationId]: applicationState });
            });
        }
    }, [currentApplicationId, currentApplicationState, localizeApplication, updateAsapAppointments]);

    const toApplications = useCallback(
        applications => _toApplications(applications).map(application => localizeApplication(application)),
        [localizeApplication]
    );

    useEffect(() => {
        const columns = [
            {
                field: 'candidateName',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.applications-table.candidate-header' }),
                flex: 1,
            },
            {
                field: 'requestedRankName',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.applications-table.rank-header' }),
                flex: 0.6,
            },
            {
                field: 'submissionDate',
                type: 'date',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.applications-table.submission-date-header' }),
                flex: 1,
                cellClassName: classNames(rootStyle.appointmentsDateCell),
            },
            {
                field: 'stepNumber',
                type: 'number',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.applications-table.stage-number-header' }),
                flex: 0.3,
            },
            {
                field: 'stepName',
                align: 'center',
                headerAlign: 'center',
                disableColumnMenu: true,
                headerName: formatMessage({ id: 'applications.applications-table.stage-name-header' }),
                flex: 1,
            },
            {
                field: 'actions',
                align: 'center',
                headerAlign: 'center',
                disableColumnMenu: true,
                headerName: formatMessage({ id: 'applications.applications-table.actions-header' }),
                flex: 0.5,
                renderCell: data => <ApplicationLink applicationId={data.row.id} canUpdate={data.row.canUpdate} />,
            },
        ];
        if (primaryRole === ROLES.ASAP_ADMIN) {
            columns.splice(0, null, {
                field: 'creatorName',
                align: 'center',
                headerAlign: 'center',
                headerName: formatMessage({ id: 'applications.applications-table.dept-head-header' }),
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
