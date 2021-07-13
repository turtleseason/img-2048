import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';

export default function Game() {
    return (
        <Stack spacing={2}>
            <Box sx={{ width: 400, height: 400, bgcolor: 'primary.dark', textAlign: 'center' }}>
                Board goes here
            </Box>
            <Stack direction='row' spacing={2}>
                <Button variant='contained'>New game</Button>
                <p>Instructions for do the thing</p>
            </Stack>
        </Stack>
    )
}