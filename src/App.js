import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import Game from './Game';
import ImageDialog from './ImageDialog';
import SettingsDrawer from './SettingsDrawer';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='Menu'
                        sx={{ mr: 2 }}
                        onClick={() => setMenuOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        2048
                    </Typography>
                </Toolbar>
            </AppBar>

            <SettingsDrawer isOpen={menuOpen} setOpen={setMenuOpen} openImageDialog={setDialogOpen} />

            <ImageDialog isOpen={dialogOpen} setOpen={setDialogOpen} />

            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    my: '.5rem',
                }}
            >
                <Game />
            </Container>
        </>
    );
}
