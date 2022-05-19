import React, { useEffect, useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import FormControl from '@mui/material/FormControl';
import { ASAP_ADMIN_APPLICATIONS } from '../../services/routing/routes';
import { useNavigate } from 'react-router-dom';
import rootStyle from '../../style/Asap.module.css';
import api from '../../services/api/api';

const LandingPage = () => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();

    const k = () => {
        api.ApplicationService.getAdminLandingPageApplications().then(r => console.log(r));
    };

    const goToApplications = () => {
        navigate(`/${ASAP_ADMIN_APPLICATIONS}`);
    };

    return (
        <div className={rootStyle.landingPageContainer}>
            <div>
                <TextareaAutosize
                    aria-label="minimum height"
                    placeholder={formatMessage({ id: 'applications.comments' })}
                    style={{ width: 100 }}
                    value={9}
                    disabled={true}
                />
                <FormattedMessage id={'admin.new-applications'} />
            </div>
            <div>
                <TextareaAutosize
                    aria-label="minimum height"
                    placeholder={formatMessage({ id: 'applications.comments' })}
                    style={{ width: 100 }}
                    value={9}
                    disabled={true}
                />
                <FormattedMessage id={'admin.open-applications'} />
            </div>

            <div>
                <TextareaAutosize
                    aria-label="minimum height"
                    placeholder={formatMessage({ id: 'applications.comments' })}
                    style={{ width: 100 }}
                    value={9}
                    disabled={true}
                />
                <FormattedMessage id={'admin.close-applications'} />
            </div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
                <Button type="submit" variant="contained" color="success" onClick={k}>
                    <FormattedMessage id={'appointment.applications-view'} />
                </Button>
            </FormControl>
        </div>
    );
};
export default LandingPage;
