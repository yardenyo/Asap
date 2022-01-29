import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames';
import apiService from '../../services/api/api';
import useApplications from '../../hooks/useApplications';
import ApplicationLink from './ApplicationLink';
import style from './Applications.module.css';

const Applications = () => {
    const { formatMessage } = useIntl();
    const { toApplications } = useApplications();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        apiService.ApplicationService.getDeptHeadApplications().then(response => {
            setApplications(toApplications(response));
        });
    }, [toApplications]);

    const columns = [
        {
            field: 'candidateName',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.candidate-header' }),
            flex: 1,
        },
        {
            field: 'requestedRankName',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.rank-header' }),
            flex: 0.6,
        },
        {
            field: 'submissionDate',
            type: 'date',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.submission-date-header' }),
            flex: 1,
            cellClassName: classNames(style.dateCell),
        },
        {
            field: 'stepNumber',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.stage-number-header' }),
            flex: 0.3,
        },
        {
            field: 'stepName',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'asap-dept-head.appointments.stage-name-header' }),
            flex: 1,
        },
        {
            field: 'actions',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'asap-dept-head.appointments.actions-header' }),
            flex: 0.5,
            renderCell: data => <ApplicationLink applicationId={data.row.id} canUpdate={data.row.canUpdate} />,
        },
    ];

    return (
        <div className={style.deptHeadAppointmentsContainer}>
            <label>{formatMessage({ id: 'asap-dept-head.appointments.title' })}</label>
            <div className={style.tableContainer}>
                <DataGrid rows={applications} columns={columns} autoPageSize />
            </div>
        </div>
    );
};

export default Applications;
