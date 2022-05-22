import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import FormControl from '@mui/material/FormControl';
import { Button, Link } from '@mui/material';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { CURRENT_APPLICATION_KEY, NEW_APPLICATION } from '../../constants';
import useApplications from '../../hooks/useApplications';
import apiService from '../../services/api/api';
import rootStyle from '../../style/Asap.module.css';
import { downloadFile } from '../../services/utils';
import { ASAP_ADMIN_APPLICATIONS } from '../../services/routing/routes';
import FileSelection from '../shared/FileSelection';
import AddIcon from '@mui/icons-material/Add';

const Application = () => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogProgress, setShowDialogProgress] = useState(true);
    const [textMessage, setTextMessage] = useState('Error');
    const { currentApplicationState: applicationState, asapAppointments, updateAsapAppointments } = useApplications();
    const { id } = useParams();
    const applicationId = parseInt(id) || NEW_APPLICATION;
    const [docsList, setDocsList] = useState([{ docs: '' }]);

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

    const updateCurrentState = response => {
        updateAsapAppointments({
            [applicationId]: {
                ...applicationState,
                'currentState': formatMessage({ id: `appointment-steps.${response}` }),
            },
        });
    };

    const handleAppointment = appointmentStatus => {
        setShowDialog(true);
        setShowDialogProgress(true);
        apiService.ApplicationService.submitAdminAppointment(
            applicationId,
            asapAppointments[applicationId],
            appointmentStatus
        ).then(response => {
            setShowDialogProgress(false);
            switch (appointmentStatus) {
                case 'submit':
                    updateCurrentState(response);
                    setTextMessage('appointment.submit-success-message');
                    break;
                case 'feedback':
                    updateCurrentState(response);
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
        navigate(`/${ASAP_ADMIN_APPLICATIONS}`);
        updateAsapAppointments({ [NEW_APPLICATION]: null });
    };

    return (
        <div className={rootStyle.appointmentContainer}>
            <FormattedMessage id={'routes.asap-dept-head-appointment-edit'} />
            <div className={rootStyle.appointmentFormContainer}>
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
                <div className={rootStyle.spanTwoColumns}>
                    <Link component="button" variant="body2" onClick={getCv}>
                        {applicationState?.cvFileName}
                    </Link>
                </div>

                <div>
                    <FormattedMessage id={'applications.letter-file-name'} />:
                </div>
                <div className={rootStyle.spanTwoColumns}>
                    <Link component="button" variant="body2" onClick={getLetter}>
                        {applicationState?.letterFileName}
                    </Link>
                </div>

                <div>
                    <FormattedMessage id={'applications.teaching-feedback'} />:
                </div>
                <div className={rootStyle.spanTwoColumns}>
                    <FileSelection
                        id={'teaching-feedback'}
                        title={formatMessage({ id: 'appointment.cv.label' })}
                        exampleLink={
                            'https://drive.google.com/file/d/165LPebDq49zUPZM1dHFLQq-c9qGTZ4wQ/view?usp=sharing'
                        }
                        withTitle={false}
                    />
                </div>

                <div>
                    <FormattedMessage id={'applications.click-to-add'} />:
                </div>
                <div className={rootStyle.spanTwoColumns}>
                    <AddIcon className={rootStyle.icon} onClick={() => console.log('hey')} />
                </div>

                {/*<div>*/}
                {/*    <FormattedMessage id={'applications.another-docs'} />:*/}
                {/*</div>*/}
                {/*<div className={rootStyle.spanTwoColumns}>*/}
                {/*    <FileSelection*/}
                {/*        id={'another-docs'}*/}
                {/*        title={formatMessage({ id: 'appointment.cv.label' })}*/}
                {/*        exampleLink={*/}
                {/*            'https://drive.google.com/file/d/165LPebDq49zUPZM1dHFLQq-c9qGTZ4wQ/view?usp=sharing'*/}
                {/*        }*/}
                {/*        withTitle={false}*/}
                {/*    />*/}
                {/*</div>*/}

                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                    <Button type="submit" variant="contained" color="success" name="submit" onClick={submitAppointment}>
                        <FormattedMessage id={'appointment.submit'} />
                    </Button>
                </FormControl>
            </div>

            <ConfirmationDialog
                showProgress={showDialogProgress}
                showDialog={showDialog}
                closeHandler={closeHandler}
                I18nKey={textMessage}
            />
        </div>
    );
};

export default Application;
