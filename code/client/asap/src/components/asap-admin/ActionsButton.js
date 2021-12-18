import React from 'react';
import { useIntl } from 'react-intl';
import {Link} from 'react-router-dom';

const ActionButton = ({appointmentId}) => {

    //Previous Code:
    //const { formatMessage } = useIntl();
    //<Button variant="contained" size={'small'} onClick={handleClick}>
    // {formatMessage({ id: 'actions-button.editText' })}
    // </Button>
    //const handleClick = () => {
    //   console.log('clicked edit button');
    // };


    //figure out how to send the ID of specific appointment
    return (
          <Link to=".\AsapAdminAppointment" />
    );
};

export default ActionButton;
