import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { CURRENT_APPLICATION_KEY, NEW_APPLICATION } from '../../constants';
import useApplications from '../../hooks/useApplications';
import rootStyle from '../../style/Asap.module.css';
import apiService from '../../services/api/api';

const Application = () => {
    const { formatMessage } = useIntl();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogProgress, setShowDialogProgress] = useState(true);
    const { currentApplicationState, asapAppointments, updateAsapAppointments } = useApplications();
    const { id } = useParams();
    const applicationId = parseInt(id) || NEW_APPLICATION;

    useEffect(() => {
        updateAsapAppointments({ [CURRENT_APPLICATION_KEY]: applicationId });
    }, [applicationId, updateAsapAppointments]);

    useEffect(() => {
        if (applicationId > 0) {
            console.log('Application getting cv...');
            apiService.ApplicationService.getCv(applicationId).then(response => console.log(response));
        }
    }, [applicationId, updateAsapAppointments]);

    console.log('Application', applicationId, currentApplicationState);

    return (
        <div className={rootStyle.appointmentContainer}>
            <FormattedMessage id={'routes.asap-dept-head-appointment'} />

            <div>
                <FormattedMessage id={'applications.dept-head'} />:{currentApplicationState?.creatorName}
            </div>

            <div>
                <FormattedMessage id={'applications.candidate'} />:{currentApplicationState?.candidateName}
            </div>

            <div>
                <FormattedMessage id={'applications.rank'} />:{currentApplicationState?.requestedRankName}
            </div>

            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                <Button type="submit" variant="contained" color="success">
                    {formatMessage({ id: 'appointment.submit' })}
                </Button>
            </FormControl>

            <ConfirmationDialog
                showProgress={showDialogProgress}
                showDialog={showDialog}
                requestSuccessI18nKey={'appointment.submit-success-message'}
            />
        </div>
    );
};

export default Application;
