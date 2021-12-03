import apiService from '../../services/api/api';
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

function Version() {
    const { formatMessage } = useIntl();
    const [currVersion, setCurrVersion] = useState('');

    useEffect(() => {
        apiService.VersionService.getCurrentVersion().then(version => setCurrVersion(version));
    }, []);

    return (
        <div>
            {formatMessage({ id: 'version.text' })}: {currVersion}
        </div>
    );
}

export default Version;
