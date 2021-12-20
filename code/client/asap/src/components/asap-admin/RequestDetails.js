import React, { useRef } from 'react';

const RequestDetails = ({ title }) => {
    const inputFile = useRef();

    return (
        <div>
            <label>{title}</label>
            <input type="text" />
        </div>
    );
};

export default RequestDetails;
