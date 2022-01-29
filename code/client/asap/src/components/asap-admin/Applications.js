import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import useApplications from '../../hooks/useApplications';
import apiService from '../../services/api/api';
import rootStyle from '../../style/Asap.module.css';

const Applications = () => {
    const { formatMessage } = useIntl();
    const { columns, toApplications } = useApplications();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        apiService.ApplicationService.getAdminApplications().then(response => {
            setApplications(toApplications(response));
        });
    }, [toApplications]);

    return (
        <div className={rootStyle.appointmentsContainer}>
            <label>{formatMessage({ id: 'applications.applications-table.title' })}</label>
            <div className={rootStyle.appointmentsTableContainer}>
                <DataGrid rows={applications} columns={columns} autoPageSize />
            </div>
        </div>
    );
};

export default Applications;
