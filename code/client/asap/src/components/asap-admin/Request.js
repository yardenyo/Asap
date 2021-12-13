import React from 'react';
import RequestDetails from "./RequestDetails";
import { useIntl } from 'react-intl';


const Request = () => {

    const { formatMessage } = useIntl();

    return(



     <div className="details">
         <RequestDetails title={formatMessage({id :'request.lecturer_class.placeholder'})}/>
         <RequestDetails title={formatMessage({id :'request.transaction_phase.placeholder'})}/>
         <RequestDetails title={formatMessage({id :'request.date.placeholder'})}/>
     </div>


    )

};

export default Request;