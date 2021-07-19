import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

interface BaseProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

interface TitleDialogProps extends BaseProps {
    title: string;
    message?: string;
}

interface MessageDialogProps extends BaseProps {
    message: string;
    title?: string;
}

type Props = TitleDialogProps | MessageDialogProps;

export default function ConfirmationDialog({ open, title, message, onConfirm, onCancel }: Props) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby={title ? 'confirm-dialog-title' : 'confirm-dialog-message'}
            aria-describedby={title && message ? 'confirm-dialog-message' : undefined}
        >
            {title &&
                <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>}
            {message &&
                <DialogContent>
                    <DialogContentText id='confirm-dialog-message'>
                        {message}
                    </DialogContentText>
                </DialogContent>}
            <DialogActions>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onConfirm}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}