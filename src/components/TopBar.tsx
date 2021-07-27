import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

interface Props {
    setMenuOpen: (open: boolean) => void;
}

export default function TopBar({ setMenuOpen }: Props) {
    const theme = useTheme();

    return (
        <AppBar position='static'>
            <Toolbar sx={{
                color: theme.palette.mode === 'dark' ? 'primary.main' : '#fff',
                justifyContent: 'space-between'
            }}>
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
    )
}