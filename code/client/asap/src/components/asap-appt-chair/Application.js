import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import FormControl from '@mui/material/FormControl';
import { Button, Link, TextareaAutosize } from '@mui/material';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { CURRENT_APPLICATION_KEY, NEW_APPLICATION } from '../../constants';
import useApplications from '../../hooks/useApplications';
import apiService from '../../services/api/api';
import rootStyle from '../../style/Asap.module.css';
import { downloadFile } from '../../services/utils';
import { ASAP_APPT_CHAIR_APPLICATIONS } from '../../services/routing/routes';

const Application = () => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogProgress, setShowDialogProgress] = useState(true);
    const [textMessage, setTextMessage] = useState('Error');
    const { currentApplicationState: applicationState, asapAppointments, updateAsapAppointments } = useApplications();
    const { id } = useParams();
    const applicationId = parseInt(id) || NEW_APPLICATION;

    useEffect(() => {
        updateAsapAppointments({ [CURRENT_APPLICATION_KEY]: applicationId });
    }, [applicationId, updateAsapAppointments]);

    const getCv = () => {
        downloadFile(apiService.ApplicationService.getCv, applicationId, applicationState?.cvFileName);
    };

    const getLetter = () => {
        downloadFile(apiService.ApplicationService.getLetter, applicationId, applicationState?.letterFileName);
    };

    const updateCvComments = event => {
        updateAsapAppointments({ [applicationId]: { ...applicationState, 'cvComments': event.target.value } });
    };

    const updateLetterComments = event => {
        updateAsapAppointments({ [applicationId]: { ...applicationState, 'letterComments': event.target.value } });
    };

    const handleAppointment = appointmentStatus => {
        setShowDialog(true);
        setShowDialogProgress(true);
        apiService.ApplicationService.handleApptChairAppointment(
            applicationId,
            asapAppointments[applicationId],
            appointmentStatus
        ).then(() => {
            setShowDialogProgress(false);
            switch (appointmentStatus) {
                case 'submit':
                    setTextMessage('appointment.submit-success-message');
                    break;
                case 'close':
                    setTextMessage('appointment.close-success-message');
                    break;
                case 'feedback':
                    setTextMessage('appointment.feedback-success-message');
                    break;
                default:
                    setTextMessage('Error');
            }
        });
    };

    const submitAppointment = e => {
        handleAppointment(e.target.name);
    };

    const closeHandler = () => {
        setShowDialog(false);
        navigate(`/${ASAP_APPT_CHAIR_APPLICATIONS}`);
        updateAsapAppointments({ [NEW_APPLICATION]: null });
    };

    return (
        <div className={rootStyle.appointmentContainer}>
            <FormattedMessage id={'routes.asap-appt-chair-edit-request'} />
            <div className={rootStyle.appointmentFormContainer}>
                <div>
                    <FormattedMessage id={'applications.dept-head'} />:
                </div>
                <div className={rootStyle.spanTwoColumns}>{applicationState?.creatorName}</div>

                <div>
                    <FormattedMessage id={'applications.candidate'} />:
                </div>
                <div className={rootStyle.spanTwoColumns}>{applicationState?.candidateName}</div>

                <div>
                    <FormattedMessage id={'applications.rank'} />:
                </div>
                <div className={rootStyle.spanTwoColumns}>{applicationState?.requestedRankName}</div>

                <div>
                    <FormattedMessage id={'applications.cv-file-name'} />:
                </div>
                <div>
                    <Link component="button" variant="body2" onClick={getCv}>
                        {applicationState?.cvFileName}
                    </Link>
                </div>
                <div>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder={formatMessage({ id: 'applications.comments' })}
                        style={{ width: 300 }}
                        value={applicationState?.cvComments || ''}
                        onChange={updateCvComments}
                    />
                </div>

                <div>
                    <FormattedMessage id={'applications.letter-file-name'} />:
                </div>
                <div>
                    <Link component="button" variant="body2" onClick={getLetter}>
                        {applicationState?.letterFileName}
                    </Link>
                </div>
                <div>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder={formatMessage({ id: 'applications.comments' })}
                        style={{ width: 300 }}
                        value={applicationState?.letterComments || ''}
                        onChange={updateLetterComments}
                    />
                </div>

                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                    <Button type="submit" variant="contained" color="success" name="submit" onClick={submitAppointment}>
                        <FormattedMessage id={'appointment.submit'} />
                    </Button>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        name="feedback"
                        onClick={submitAppointment}
                    >
                        <FormattedMessage id={'appointment.feedback'} />
                    </Button>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                    <Button type="submit" variant="contained" color="success" name="close" onClick={submitAppointment}>
                        <FormattedMessage id={'appointment.rejection'} />
                    </Button>
                </FormControl>
            </div>

            <ConfirmationDialog
                showProgress={showDialogProgress}
                showDialog={showDialog}
                closeHandler={closeHandler}
                requestSuccessI18nKey={textMessage}
            />
        </div>
    );
};

export default Application;