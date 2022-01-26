import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import apiService from '../../services/api/api';
import FileSelection from '../shared/FileSelection';
import Selection from '../shared/Selection';
import { useAsapContext } from '../../services/state/AsapContextProvider';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { ASAP_DEPT_HEAD_APPOINTMENT } from '../../services/routing/routes';
import style from './Appointments.module.css';

const Appointment = () => {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const { asapAppointments } = useAsapContext();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogProgress, setShowDialogProgress] = useState(true);

    const [candidates, setCandidates] = useState([]);
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        apiService.AppointmentService.getDeptCandidates().then(response => setCandidates(response));
        apiService.AppointmentService.getRanks().then(response => setRanks(response));
    }, []);

    const submitAppointment = () => {
        setShowDialog(true);
        setShowDialogProgress(true);
        apiService.AppointmentService.submitAppointment(0, asapAppointments).then(resposne => {
            setShowDialogProgress(false);
        });
    };

    const closeHandler = () => {
        setShowDialog(false);
        navigate(ASAP_DEPT_HEAD_APPOINTMENT);
    };
    return (
        <div className={style.appointmentContainer}>
            <FormattedMessage id={'routes.asap-dept-head-appointment'} />

            <Selection
                id={'candidate'}
                labelI18nKey={'appointment.candidates.label'}
                labelId={'candidate-select-label'}
                options={candidates}
                optionLabelSetter={candidate => `${candidate.user.first_name} ${candidate.user.last_name}`}
                optionsValueSetter={candidate => candidate.user.id}
            />
            <Selection
                id={'rank'}
                labelI18nKey={'appointment.ranks.label'}
                labelId={'rank-select-label'}
                options={ranks}
                optionLabelSetter={rank => rank.name}
                optionsValueSetter={rank => rank.id}
            />

            <FileSelection
                id={'cv'}
                title={formatMessage({ id: 'appointment.cv.label' })}
                exampleLink={'https://www.google.com'}
            />

            <FileSelection
                id={'letter'}
                title={formatMessage({ id: 'appointment.letter.label' })}
                exampleLink={'https://www.google.com'}
            />

            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                <Button type="submit" variant="contained" color="success" onClick={submitAppointment}>
                    {formatMessage({ id: 'appointment.submit' })}
                </Button>
            </FormControl>

            <ConfirmationDialog
                showProgress={showDialogProgress}
                showDialog={showDialog}
                closeHandler={closeHandler}
                requestSuccessI18nKey={'appointment.submit-success-message'}
            />
        </div>
    );
};

export default Appointment;
