import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

export default function ImageDialog({ isOpen, setOpen }: Props) {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setOpen(false)}
            scroll='paper'
            aria-labelledby='image-dialog-title'
        >
            <DialogTitle id='image-dialog-title'>Choose custom images</DialogTitle>
            <DialogContent>
                Image selection goes here
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Apply</Button>
            </DialogActions>
        </Dialog>
    )
}