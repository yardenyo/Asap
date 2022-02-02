import React from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import style from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ showProgress, showDialog, closeHandler, requestSuccessI18nKey }) => {
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={showDialog}
                PaperProps={{
                    sx: {
                        height: 300,
                    },
                }}
            >
                <DialogContent className={style.dialogContentContainer} dividers>
                    {showProgress ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            <FormattedMessage id={requestSuccessI18nKey} />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeHandler} disabled={showProgress}>
                        <FormattedMessage id={'approve'} />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationDialog;
