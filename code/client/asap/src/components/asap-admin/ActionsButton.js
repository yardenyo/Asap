import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ActionButton = ({ appointmentId, details }) => {
    const { formatMessage } = useIntl();

    return (
        <Link to={`/request/${appointmentId}`} state={{ details }}>
            <Button variant="contained" size={'small'}>
                {formatMessage({ id: 'actions-button.editText' })}
            </Button>
        </Link>
    );
};

export default ActionButton;
