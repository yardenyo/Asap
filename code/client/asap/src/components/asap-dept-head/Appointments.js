import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames';
import apiService from '../../services/api/api';
import ActionsButton from '../asap-admin/ActionsButton';
import style from './Appointments.module.css';
import useAppointments from '../../hooks/useAppointments';

const PAGE_SIZE = 5;

const Appointments = () => {
    const { formatMessage } = useIntl();
    const { toAppointments } = useAppointments();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        apiService.AppointmentService.getDeptHeadAppointments().then(response => {
            setAppointments(toAppointments(response));
        });
    }, [toAppointments]);

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
            cellClassName: classNames(style.dateCell),
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
