import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import ActionsButton from './ActionsButton';

const AdminMainViewTable = () => {
    const { formatMessage } = useIntl();

    // these are arbitrary values, can be changed
    const tableWidth = 1200;
    const tableHeight = 500;
    const pageSize = 5;

    const columns = [
        {
            field: 'departmentHead',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'admin-main-view-table.depHead.text' }),
            flex: 1.5,
        },
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
            field: 'stageNumber',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'admin-main-view-table.stageNumber.text' }),
            flex: 1,
        },
        {
            field: 'stageName',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'admin-main-view-table.stageName.text' }),
            flex: 1,
        },
        {
            field: 'actions',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'admin-main-view-table.actions.text' }),
            flex: 0.5,
            renderCell: () => <ActionsButton />,
        },
    ];

    const rows = [
        //data
    ];

    return (
        <div style={{ height: tableHeight, width: tableWidth }}>
            <DataGrid rows={rows} columns={columns} pageSize={pageSize} rowsPerPageOptions={[5]} />
        </div>
    );
};

export default AdminMainViewTable;
