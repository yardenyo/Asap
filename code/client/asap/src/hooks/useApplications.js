import { useIntl } from 'react-intl';
import { useCallback, useEffect } from 'react';
import { useAsapContext } from '../services/state/AsapContextProvider';
import { NEW_APPLICATION } from '../constants';
import apiService from '../services/api/api';

const _toApplications = applications => applications.map(application => toApplication(application));

const toApplication = application => {
    const date = new Date(Date.parse(application.created_at));
    const timezoneDate = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
    const steps = application.steps.length;
    const currentStep = application.steps[steps - 1];
    return {
        id: application.id,
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
    const { asapAppointments, updateAsapAppointments } = useAsapContext();
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

    return { toApplications, currentApplicationState, updateAsapAppointments, currentApplicationId };
};

export default useApplications;
