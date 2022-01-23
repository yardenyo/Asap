import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useAsapContext } from '../../services/state/AsapContextProvider';
import apiService from '../../services/api/api';
import style from './Appointments.module.css';
import FormControl from '@mui/material/FormControl';

const Appointment = () => {
    const { formatMessage } = useIntl();
    const [candidate, setCandidate] = useState('');
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        apiService.AppointmentService.getDeptCandidates().then(response => setCandidates(response));
    }, []);
    const { asapDeptHead, updateAsapDeptHead } = useAsapContext();
    const [age, setAge] = React.useState('');

    const handleChange = event => {
        setCandidate(event.target.value);
    };
    const rank = ['Admin', 'Head'];
    return (
        <div className={style.appointmentContainer}>
            <FormattedMessage id={'routes.asap-dept-head-appointment'} />

            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">
                    {formatMessage({ id: 'Select_component.candidate.placeholder' })}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={candidate}
                    onChange={handleChange}
                    label={formatMessage({ id: 'Select_component.candidate.placeholder' })}
                >
                    {candidates.map((candidate, index) => {
                        return (
                            <MenuItem key={index} value={candidate.user.id}>
                                {candidate.user.first_name} {candidate.user.last_name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            {/*<Selection
                id="2"
                title={formatMessage({ id: 'Select_component.rank.placeholder' })}
                options={rank}
                contextGetter={asapDeptHead}
                contextSetter={updateAsapDeptHead}
                contextPropName={'rank'}
            />
            <FileSelection
                title={formatMessage({ id: 'file-selection.malag.placeholder' })}
                id="1"
                contextGetter={asapDeptHead}
                contextSetter={updateAsapDeptHead}
                contextPropName={'cv'}
            />
            <FileSelection
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
