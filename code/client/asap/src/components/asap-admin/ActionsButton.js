import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const ActionButton = ({ appointmentId, details }) => {
    const { formatMessage } = useIntl();

    return (
        <Link to={`/request/${appointmentId}`} state={{ details }}>
            <button variant="contained" size={'small'}>
                {formatMessage({ id: 'actions-button.editText' })}
            </button>
        </Link>
    );
};

export default ActionButton;
