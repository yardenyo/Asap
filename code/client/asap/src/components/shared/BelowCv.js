import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import rootStyle from '../../style/Asap.module.css';
import apiService from '../../services/api/api';

const BelowCv = ({ applicationState }) => {
    const [date, setDate] = useState('');
    const [stage, setStage] = useState('');
    const RANK_ID = 3;

    useEffect(() => {
        apiService.ApplicationService.get_remaining_days(applicationState?.candidateId).then(response => {
            setDate(response['finish_date']);
            setStage(response['stage']);
        });
    }, [applicationState?.candidateId, stage]);

    const showIfLecturer = () => {
        if (applicationState?.currentRankNumber === RANK_ID) {
            return (
                <>
                    <div>
                        <FormattedMessage id={'applications.candidate-rank'} />:
                    </div>
                    <div className={rootStyle.spanTwoColumns}>{stage}</div>
                    <div>
                        <FormattedMessage id={'applications.candidate-end-date'} />:
                    </div>
                    <div className={rootStyle.spanTwoColumns}>{date}</div>
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

            {showIfLecturer()}

            <div className={rootStyle.spanTwoColumns} />
        </>
    );
};

export default BelowCv;
