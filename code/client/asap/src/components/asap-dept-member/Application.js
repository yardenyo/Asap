import React, { useEffect, useState } from 'react';
import rootStyle from '../../style/Asap.module.css';
import FileSelection from '../shared/FileSelection';
import { useIntl } from 'react-intl';
import Selection from '../shared/Selection';
import { CURRENT_APPLICATION_KEY, NEW_APPLICATION } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsapContext } from '../../services/state/AsapContextProvider';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import apiService from '../../services/api/api';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { ASAP_DEPT_MEMBER_APPLICATION_VIEW } from '../../services/routing/routes';
import useApplications from '../../hooks/useApplications';

const Application = () => {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const { id } = useParams();
    const { asapAppointments, updateAsapAppointments } = useAsapContext();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogProgress, setShowDialogProgress] = useState(true);
    const { asapUser } = useAsapContext();

    const [ranks, setRanks] = useState([]);
    const [newApplicationId, setNewApplicationId] = useState(0);
    const applicationId = parseInt(id) || NEW_APPLICATION;
    const { currentApplicationId, currentApplicationState } = useApplications();

    useEffect(() => {
        apiService.ApplicationService.getRanks().then(response => setRanks(response));
        updateAsapAppointments({ [CURRENT_APPLICATION_KEY]: applicationId });
    }, [applicationId, updateAsapAppointments]);

    useEffect(() => {
        const updatedApplicationState = { ...currentApplicationState, ['candidateId']: asapUser?.id };
        updateAsapAppointments({ [currentApplicationId]: updatedApplicationState });
    }, [applicationId, updateAsapAppointments]);

    const closeHandler = () => {
        setShowDialog(false);
        navigate(`/${ASAP_DEPT_MEMBER_APPLICATION_VIEW}/${newApplicationId}`);
        updateAsapAppointments({ [NEW_APPLICATION]: null });
    };

    const submitAppointment = () => {
        console.log(asapAppointments[applicationId]);
        setShowDialog(true);
        setShowDialogProgress(true);
        apiService.ApplicationService.submitDeptHeadAppointment(applicationId, asapAppointments[applicationId]).then(
            respone => {
                setNewApplicationId(respone);
                console.log({ newApplicationId });
                setShowDialogProgress(false);
            }
        );
    };

    return (
        <div className={rootStyle.appointmentContainer}>
            <h3>
                {asapUser?.first_name} {asapUser?.last_name}
            </h3>
            <Selection
                id={'requestedRankId'}
                labelI18nKey={'appointment.ranks.label'}
                labelId={'rank-select-label'}
                options={ranks}
                optionLabelSetter={rank => rank.name}
                optionsValueSetter={rank => rank.id}
            />

            <FileSelection
                id={'cv'}
                title={formatMessage({ id: 'appointment.cv.label' })}
                exampleLink={'https://drive.google.com/file/d/165LPebDq49zUPZM1dHFLQq-c9qGTZ4wQ/view?usp=sharing'}
            />

            <FileSelection
                id={'letter'}
                title={formatMessage({ id: 'appointment.letter.label' })}
                exampleLink={'https://drive.google.com/file/d/1Ao3QYV41sGGzpgLPkEYX92Qrexm2OUAG/view?usp=sharing'}
            />

            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                <Button type="submit" variant="contained" color="success" onClick={submitAppointment}>
                    {formatMessage({ id: 'appointment.submit' })}
                </Button>
            </FormControl>

            <ConfirmationDialog
                showProgress={showDialogProgress}
                showDialog={showDialog}
                closeHandler={closeHandler}
                requestSuccessI18nKey={'appointment.submit-success-message'}
            />
        </div>
    );
};

export default Application;
