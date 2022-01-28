import { useIntl } from 'react-intl';
import { useCallback } from 'react';

const useAppointments = () => {
    const { formatMessage } = useIntl();

    const toAppointments = useCallback(
        appointments =>
            appointments.map(appointment => {
                const date = new Date(Date.parse(appointment.created_at));
                const timezoneDate = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
                const steps = appointment.steps.length;
                const currentStep = appointment.steps[steps - 1];
                return {
                    id: appointment.id,
                    candidate: `${appointment.applicant.user.first_name} ${appointment.applicant.user.last_name}`,
                    requestedRank: appointment.desired_rank.name,
                    submissionDate: timezoneDate.toLocaleString('he-IL'),
                    stageNumber: steps,
                    stageName: formatMessage({
                        id: `appointment-steps.${currentStep.step_name}`,
                    }),
                    canCancel: currentStep.can_cancel,
                    canUpdate: currentStep.can_update,
                };
            }),
        [formatMessage]
    );

    return { toAppointments };
};

export default useAppointments;
