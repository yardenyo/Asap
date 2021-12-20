import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const ActionButton = ({ appointmentId }) => {
    const { formatMessage } = useIntl();

    //figure out how to send the ID of specific appointment
    return (
        <Link to="/request/:id">
            <button variant="contained" size={'small'}>
                {formatMessage({ id: 'actions-button.editText' })}
            </button>
        </Link>
    );
};

export default ActionButton;
