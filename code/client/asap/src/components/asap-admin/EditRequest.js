import React from 'react';
import RequestDetails from './RequestDetails';
import DownloadFields from './DownloadFields';
import './EditRequest.css';
import { useIntl } from 'react-intl';
import { Button } from '@mui/material';

const EditRequest = ({ numberRequest, admin, candidate, stage }) => {
    const { formatMessage } = useIntl();

    const onClick = () => {
        console.log('1');
    };

    return (
        <>
            <div className="page-details">
                <label>
                    {formatMessage({ id: 'asap-admin-edit-request.request.placeholder' })}{' '}
                    {numberRequest + ' -' + admin + ''}{' '}
                    {formatMessage({ id: 'asap-admin-edit-request.candidate.placeholder' })} {' ' + candidate + ' -'}
                    {formatMessage({ id: 'asap-admin-edit-request.stage.placeholder' })}
                    {' ' + stage}
                </label>
            </div>
            <div className="requiredRank">
                {' '}
                {formatMessage({ id: 'asap-admin-edit-request.required-rank.placeholder' })}
                <span>" "דרגה 1"</span>
            </div>
            <div className="download_field">
                <DownloadFields title={formatMessage({ id: 'asap-admin-edit-request.cv.placeholder' })} />
                <DownloadFields
                    title={formatMessage({ id: 'asap-admin-edit-request.initiation_letter.placeholder' })}
                />
            </div>

            <div className="details">
                <RequestDetails title={formatMessage({ id: 'asap-admin-edit-request.lecturer_class.placeholder' })} />
                <RequestDetails
                    title={formatMessage({ id: 'asap-admin-edit-request.transaction_phase.placeholder' })}
                />
                <RequestDetails title={formatMessage({ id: 'asap-admin-edit-request.date.placeholder' })} />
            </div>

            <Button id="sentForAdmin" onClick={onClick} variant="contained">
                {formatMessage({ id: 'asap-admin-edit-request.button.send' })}
            </Button>
        </>
    );
};

export default EditRequest;