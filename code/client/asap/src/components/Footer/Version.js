import apiService from '../../services/api/api';
import { useState } from 'react';
import { useIntl } from 'react-intl';

function Version() {
    const { formatMessage } = useIntl();
    const [currVersion, setCurrVersion] = useState('');
    if (currVersion === '') {
        setCurrVersion(apiService.VersionService.getCurrentVersion());
    }

    return (
        <div>
            {' '}
            {formatMessage({ id: 'version.text' })} --> {currVersion}{' '}
        </div>
    );
}

export default Version;
