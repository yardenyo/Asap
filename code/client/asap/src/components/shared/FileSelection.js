import React, { useRef, useState } from 'react';
import { Button, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIntl } from 'react-intl';
import { useAsapContext } from '../../services/state/AsapContextProvider';
import style from './FileSelection.module.css';

const FileSelection = ({ id, exampleLink, title }) => {
    const { formatMessage } = useIntl();
    const { asapAppointments, updateAsapAppointments } = useAsapContext();
    // TODO const { currentAppointmentId } = asapAppointments;

    const [isFilePicked, setFilePicked] = useState(false);
    const inputFile = useRef();

    const applyFile = event => {
        const file = event.target.files[event.target.files.length - 1];
        updateAsapAppointments({ [id]: file });
        setFilePicked(true);
    };

    const uploadFileHandler = () => inputFile.current.click();

    const removeFileHandler = () => {
        updateAsapAppointments({ [id]: null });
        setFilePicked(false);
    };

    return (
        <div className={style.fileSelectionContainer}>
            <div className={style.labelContainer}>
                <label>{title}:</label>
                {exampleLink && (
                    <Link href={exampleLink} target="_blank" rel="noreferrer" className={style.example}>
                        {formatMessage({ id: 'appointment.example' })}
                    </Link>
                )}
            </div>
            <Button onClick={uploadFileHandler} variant="contained">
                <input type="file" hidden onChange={applyFile} id={id} ref={inputFile} />
                <div>{formatMessage({ id: 'appointment.file-selection' })}</div>
            </Button>
            {isFilePicked && (
                <div className={style.selectedFileContainer}>
                    <div className={style.selectedFile}>
                        <label>{asapAppointments[id]?.name}</label>
                        <CloseIcon onClick={removeFileHandler} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileSelection;
