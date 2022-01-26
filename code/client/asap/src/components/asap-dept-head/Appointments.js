import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DataGrid } from '@mui/x-data-grid';
import apiService from '../../services/api/api';
import ActionsButton from '../asap-admin/ActionsButton';
import style from './Appointments.module.css';

const PAGE_SIZE = 5;

const Appointments = () => {
    const { formatMessage } = useIntl();
    const [appointments, setAppointments] = useState([]);

    console.log('Appointments');
    useEffect(() => {
        console.log('Appointments effect');
        apiService.AppointmentService.getDeptHeadAppointments().then(response => setAppointments(response));
    }, []);

    const columns = [
        {
            field: 'candidate',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.candidate-header' }),
            flex: 0.3,
        },
        {
            field: 'requestedRank',
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            headerName: formatMessage({ id: 'asap-dept-head.appointments.rank-header' }),
            flex: 1,
        },
        {
            field: 'submissionDate',
            type: 'date',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.submission-date-header' }),
            flex: 1,
        },
        {
            field: 'stageNumber',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            headerName: formatMessage({ id: 'asap-dept-head.appointments.stage-number-header' }),
            flex: 1,
        },
        {
            field: 'stageName',
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
            renderCell: data => {
                return <ActionsButton appointmentId={data.row.id} details={data.row} />;
            },
        },
    ];

    return (
        <div className={style.deptHeadAppointmentsContainer}>
            <label>{formatMessage({ id: 'asap-dept-head.appointments.title' })}</label>
            <div className={style.tableContainer}>
                <DataGrid rows={appointments} columns={columns} pageSize={PAGE_SIZE} rowsPerPageOptions={[5]} />
            </div>
        </div>
    );
};

export default Appointments;
