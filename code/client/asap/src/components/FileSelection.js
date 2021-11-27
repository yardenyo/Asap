import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIntl } from 'react-intl';
import style from './FileSelection.module.css';


/**
 * @params 
 * props should contain:
 *
 * title - string : the file that the user needs to add;
 * link - string : the link to the example file;
 * id - string : the id that will be sent to the server;
 */

const FileSelection = ({title,link,id}) => {
    const { formatMessage } = useIntl();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const inputFile = useRef();

    const applyFile = event => {
        const file = event.target.files[event.target.files.length - 1];
        setSelectedFile(file);
        setIsFilePicked(true);
    };

    const uploadFileHandler = () => {
        inputFile.current.click();
    };

    const removeFileHandler = () => {
        setSelectedFile(null);
        setIsFilePicked(false);
    }

    return (
        <form className={style.container}>
            <div className={style.inputContainer}>
                <input onChange={applyFile} type="file" id={id} ref={inputFile} style={{ display: 'none' }} />
                <Button onClick={uploadFileHandler} variant="contained">
                    {formatMessage({ id: 'file-selection.choosebutton.children' })}
                </Button>
                {isFilePicked && <CloseIcon onClick={removeFileHandler} />}
                <label> {isFilePicked ? selectedFile.name : ''}</label>
            </div>
            <Button type="submit" variant="contained">
                {formatMessage({ id: 'file-selection.submitbutton.children' })}
            </Button>
            <div className={style.titleContainer}>
                <p>{title}</p>
                <a href={link} target="_blank" rel="noreferrer">
                    {formatMessage({ id: 'file-selection.examplelink.children' })}
                </a>
            </div>
        </form>
    );
};

export default FileSelection;