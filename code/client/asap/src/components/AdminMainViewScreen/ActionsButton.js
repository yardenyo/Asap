import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@mui/material';

const ActionButton = () => {
    const { formatMessage } = useIntl();

    const handleClick = () => {
        console.log('clicked edit button');
    };

    return (
        <Button variant="contained" size={'small'} onClick={handleClick}>
            {formatMessage({ id: 'actions-button.editText' })}
        </Button>
    );
};

export default ActionButton;
