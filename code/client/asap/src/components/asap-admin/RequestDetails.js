import React, { useState, useRef } from 'react';
import {text} from "@fortawesome/fontawesome-svg-core";


const RequestDetails = ({title}) => {
    const inputFile = useRef();

    return (
        <div>
            <label>{title}</label>
           <input
           type="text"
           />
        </div>

    );
};

export default RequestDetails;