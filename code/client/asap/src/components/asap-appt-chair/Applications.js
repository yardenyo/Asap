import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import useApplications from '../../hooks/useApplications';
import { useEffect, useState } from 'react';
import apiService from '../../services/api/api';
import rootStyle from "../../style/Asap.module.css";

const Applications = () => {
    const { formatMessage } = useIntl();
    const { toApplications, columns } = useApplications();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        apiService.ApplicationService.getDeptChairApplications().then(response => {
            setApplications(toApplications(response));
        });
    }, [toApplications]);

    return (
        <div className={rootStyle.appointmentsContainer}>
            <label>{formatMessage({ id: 'applications.title' })}</label>
            <div className={rootStyle.appointmentsTableContainer}>
                <DataGrid rows={applications} columns={columns} autoPageSize />
            </div>
        </div>
    );
};

export default Applications;
