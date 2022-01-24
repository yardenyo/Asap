import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import apiService from '../../services/api/api';
import FileSelection from '../shared/FileSelection';
import Selection from '../shared/Selection';
import style from './Appointments.module.css';

const Appointment = () => {
    const { formatMessage } = useIntl();

    const [candidates, setCandidates] = useState([]);
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        apiService.AppointmentService.getDeptCandidates().then(response => setCandidates(response));
        apiService.AppointmentService.getRanks().then(response => setRanks(response));
    }, []);

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
                <Button type="submit" variant="contained" color="success">
                    {formatMessage({ id: 'appointment.submit' })}
                </Button>
            </FormControl>
        </div>
    );
};

export default Appointment;
