import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import ActionsButton from '../asap-appt-chair/ActionsButton';

const Appointments = () => {
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'appointments.my-appointments' });
    const tableWidth = 1200;
    const tableHeight = 500;
    const pageSize = 4;

    const columns = [
        {
            field: 'candidate',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'admin-main-view-table.candidate.text' }),
            flex: 0.3,
        },
        {
            field: 'requestedRank',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'admin-main-view-table.reqRank.text' }),
            flex: 1,
        },
        {
            field: 'submissionDate',
            type: 'date',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'admin-main-view-table.subDate.text' }),
            flex: 1,
        },
        {
            field: 'actions',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'admin-main-view-table.actions.text' }),
            flex: 0.5,
            renderCell: data => (
                <ActionsButton
                    id={data.row.id}
                    candidate={data.row.candidate}
                    requestedRank={data.row.requestedRank}
                    submissionDate={data.row.submissionDate}
                />
            ),
        },
    ];

    const rows = [
        {
            id: 1,
            candidate: 'ירדן',
            requestedRank: 'Manager',
            submissionDate: '25-11-2021',
        },
        {
            id: 2,
            candidate: 'איתי',
            requestedRank: 'Admin',
            submissionDate: '26-11-2021',
        },
    ];

    return (
        <div style={{ height: tableHeight, width: tableWidth }}>
            <div>{title}</div>
            <DataGrid rows={rows} columns={columns} pageSize={pageSize} rowsPerPageOptions={[5]} />
        </div>
    );
};

export default Appointments;
