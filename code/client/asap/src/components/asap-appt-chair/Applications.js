import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import ActionsButton from '../asap-appt-chair/ActionsButton';
import useApplications from '../../hooks/useApplications';
import { useEffect, useState } from 'react';
import apiService from '../../services/api/api';

const Applications = () => {
    const { formatMessage } = useIntl();
    const { toApplications, columns } = useApplications();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        apiService.ApplicationService.getDeptChairApplications().then(response => {
            setApplications(toApplications(response));
        });
    }, [toApplications]);

    const title = formatMessage({ id: 'appointments.my-appointments' });
    const tableWidth = 1200;
    const tableHeight = 500;
    const pageSize = 4;

    return (
        <div style={{ height: tableHeight, width: tableWidth }}>
            <div>{title}</div>
            <DataGrid rows={applications} columns={columns} pageSize={pageSize} rowsPerPageOptions={[5]} />
        </div>
    );
};

export default Applications;
