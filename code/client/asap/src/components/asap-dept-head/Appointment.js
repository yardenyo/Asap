import React from 'react';
import Selection from '../shared/Selection';
import { useIntl } from 'react-intl';
import FileSelection from '../shared/FileSelection';
import { Button } from '@mui/material';

const Appointment = () => {
    const { formatMessage } = useIntl();
    const candidate = ['Yarden', 'Itay'];
    const rank = ['Admin', 'Head'];
    return (
        <div>
            {formatMessage({ id: 'routes.asap-dept-head-appointment' })}
            <Selection
                id="1"
                title={formatMessage({ id: 'Select_component.candidate.placeholder' })}
                options={candidate}
            />
            <Selection id="2" title={formatMessage({ id: 'Select_component.rank.placeholder' })} options={rank} />
            <FileSelection title={formatMessage({ id: 'file-selection.malag.placeholder' })} id="1" />
            <FileSelection title={formatMessage({ id: 'file-selection.initiated.placeholder' })} id="2" />

            <Button type="submit" variant="contained" color="success">
                {formatMessage({ id: 'file-selection.submitbutton.children' })}
            </Button>
        </div>
    );
};

export default Appointment;
