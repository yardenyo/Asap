import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button } from '@mui/material';
import { ASAP_DEPT_HEAD_APPLICATION } from '../../services/routing/routes';

const ApplicationLink = ({ applicationId, canUpdate }) => {
    const { formatMessage } = useIntl();

    return (
        <Link to={`/${ASAP_DEPT_HEAD_APPLICATION}/${applicationId}`}>
            <Button variant="contained" size={'small'} disabled={!canUpdate}>
                {formatMessage({ id: 'actions-button.editText' })}
            </Button>
        </Link>
    );
};

export default ApplicationLink;
