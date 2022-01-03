import React from 'react';
import Selection from '../shared/Selection';
import { useIntl } from 'react-intl';
import FileSelection from '../shared/FileSelection';
import { Button } from '@mui/material';
import { useAsapContext } from '../../services/state/AsapContextProvider';

const Appointment = () => {
    const { formatMessage } = useIntl();
    const { asapDeptHead, updateAsapDeptHead } = useAsapContext();
    const candidate = ['Yarden', 'Itay'];
    const rank = ['Admin', 'Head'];
    return (
        <div>
            {formatMessage({ id: 'routes.asap-dept-head-appointment' })}
            <Selection
                id="1"
                title={formatMessage({ id: 'Select_component.candidate.placeholder' })}
                options={candidate}
                contextGetter={asapDeptHead}
                contextSetter={updateAsapDeptHead}
                contextPropName={'candidate'}
            />
            <Selection
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
            </Button>
        </div>
    );
};

export default Appointment;
