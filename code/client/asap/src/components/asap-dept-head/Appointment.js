import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '@mui/material';
import { useAsapContext } from '../../services/state/AsapContextProvider';
import apiService from '../../services/api/api';
import FileSelection from '../shared/FileSelection';
import Selection from '../shared/Selection';
import style from './Appointments.module.css';

const Appointment = () => {
    const { formatMessage } = useIntl();

    const [candidates, setCandidates] = useState([]);
    const [ranks, setRanks] = useState([]);

    const { asapDeptHead, updateAsapDeptHead } = useAsapContext();

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

            <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
            </Button>
            <FileSelection
                title={formatMessage({ id: 'file-selection.malag.placeholder' })}
                id="1"
                contextGetter={asapDeptHead}
                contextSetter={updateAsapDeptHead}
                contextPropName={'cv'}
            />
            {/*<FileSelection
                title={formatMessage({ id: 'file-selection.initiated.placeholder' })}
                id="2"
                contextGetter={asapDeptHead}
                contextSetter={updateAsapDeptHead}
                contextPropName={'initiated'}
            />

            <Button type="submit" variant="contained" color="success">
                {formatMessage({ id: 'file-selection.submitbutton.children' })}
            </Button>*/}
        </div>
    );
};

export default Appointment;
