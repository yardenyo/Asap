import React, { useState } from 'react';
import apiService from '../../services/api/api';
import { useIntl } from 'react-intl';

const HeaderUser = () => {
    const { formatMessage } = useIntl();
    const [name, setName] = useState('');
    const getUserName = () => {
        apiService.UserService.getCurrentUser().then(name => setName(name));
    }
    return <p onLoad={getUserName} > {formatMessage({ id: 'header.user.message' })} , {name}</p>
}

export default HeaderUser