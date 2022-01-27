import { useIntl } from 'react-intl';

const useAppointments = () => {
    const { formatMessage } = useIntl();
    const toAppointments = appointments =>
        appointments.map(appointment => {
            const date = new Date(Date.parse(appointment.created_at));
            const timezoneDate = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
            return {
                id: appointment.id,
                candidate: `${appointment.applicant.user.first_name} ${appointment.applicant.user.last_name}`,
                requestedRank: appointment.desired_rank.name,
                submissionDate: timezoneDate.toLocaleString('he-IL'),
                stageNumber: appointment.steps.length,
                stageName: formatMessage({
                    id: `appointment-steps.${appointment.steps[appointment.steps.length - 1].step_name}`,
                }),
            };
        });

    return { toAppointments };
};

export default useAppointments;
