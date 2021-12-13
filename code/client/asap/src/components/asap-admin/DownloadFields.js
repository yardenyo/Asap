import React from "react";
import {useState} from "react";
import "./DownloadFields.css";
import './DownloadFields.css';
import { useIntl } from 'react-intl';

const DownloadFields=({title})=>{
    const [remarks, setRemarks] = useState('');
    const { formatMessage } = useIntl();

    function getField() {
         console.log(remarks)
    }

  return (
    <div className={'fieldContainer'}>
        <div className={'titleField'}>
            {title}
            </div>
        <div className={'download'}>
            <button onClick={getField} >
                {formatMessage({id:'download-field-admin.button-text.text'})}
            </button>
        </div>
        <div className={'Remarks'}>
        {formatMessage({id:'download-field-admin.remarks.text'})}
        </div>
        <div className={'textBox'}>
            <textarea onChange={event => setRemarks(event.target.value)}/>
        </div>
    </div>
  );
}
export default DownloadFields ;