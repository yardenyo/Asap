import React from 'react';
import { FormattedMessage } from 'react-intl';
import rootStyle from '../../style/Asap.module.css';

const BelowCv = ({ applicationState }) => {
    const RANK_ID = 3;
    return (
        <>
            <div>
                <FormattedMessage id={'applications.candidate-dept'} />:
            </div>
            <div className={rootStyle.spanTwoColumns}>{applicationState?.department}</div>

            <div>
                <FormattedMessage id={'applications.candidate-rank'} />:
            </div>
            <div className={rootStyle.spanTwoColumns}>
                <FormattedMessage id={`currentRank.${applicationState?.currentRankNumber}`} />
            </div>

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
