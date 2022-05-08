import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import rootStyle from '../../style/Asap.module.css';
import apiService from '../../services/api/api';

const BelowCv = ({ applicationState }) => {
    const [Date, setDate] = useState('');
    const RANK_ID = 3;

    useEffect(() => {
        apiService.ApplicationService.get_remaining_days(applicationState?.candidateId).then(response => {
            setDate(response['joined_date']);
        });
    }, [applicationState?.candidateId]);

    const showIfLecturer = () => {
        if (applicationState?.currentRankNumber === RANK_ID) {
            return (
                <>
                    <div>
                        <FormattedMessage id={'applications.candidate-rank'} />:
                    </div>
                    <div className={rootStyle.spanTwoColumns}>
                        <FormattedMessage id={`currentRank.${applicationState?.currentRankNumber}`} />
                    </div>
                    <div>
                        <FormattedMessage id={'applications.candidate-end-date'} />:
                    </div>
                    <div className={rootStyle.spanTwoColumns}>{Date}</div>
                </>
            );
        }
    };

    return (
        <>
            <div>
                <FormattedMessage id={'applications.candidate-dept'} />:
            </div>
            <div className={rootStyle.spanTwoColumns}>{applicationState?.department}</div>

            <div>
                {applicationState?.currentRankNumber === RANK_ID ? (
                    <div>
                        <FormattedMessage id={'applications.candidate-end-date'} />:
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className={rootStyle.spanTwoColumns} />
        </>
    );
};

export default BelowCv;
