import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

import Game from './game/GameContainer';
import ImageDialog from './ImageDialog';
import SettingsDrawer from './SettingsDrawer';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <AppBar position='static'>
                <Toolbar sx={{ color: 'primary.main', justifyContent: 'space-between' }}>
                    <IconButton
                        onClick={() => setMenuOpen(true)}
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='Menu'
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        href='https://github.com/turtleseason/img-2048'
                        size='large'
                        edge='end'
                        color='inherit'
                        aria-label='Github repository'
                    >
                        <GitHubIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <SettingsDrawer isOpen={menuOpen} setOpen={setMenuOpen} setImageDialogOpen={setDialogOpen} />

            <ImageDialog isOpen={dialogOpen} setOpen={setDialogOpen} />

            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Game />
            </Container>
        </>
    );
}
