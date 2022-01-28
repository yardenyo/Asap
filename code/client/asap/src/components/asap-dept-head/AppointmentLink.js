import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button } from '@mui/material';
import { ASAP_DEPT_HEAD_APPOINTMENT } from '../../services/routing/routes';

const AppointmentLink = ({ details }) => {
    const { formatMessage } = useIntl();

    return (
        <Link to={`/${ASAP_DEPT_HEAD_APPOINTMENT}/${details.id}`} state={{ details }}>
            <Button variant="contained" size={'small'} disabled={!details.canUpdate}>
                {formatMessage({ id: 'actions-button.editText' })}
            </Button>
        </Link>
    );
};

export default AppointmentLink;
