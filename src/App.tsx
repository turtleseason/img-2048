import React, { useState } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';

import Game from './game/GameContainer';
import ImageDialog from './components/ImageDialog';
import SettingsDrawer from './components/SettingsDrawer';
import TopBar from './components/TopBar';

const themeBuilder = (mode: 'light' | 'dark') => ({
    palette: {
        mode,
        primary: {
            main: lightGreen[200],
        },
        tonalOffset:
        {
            light: .4,
            dark: .2,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 340,
            md: 600,
            lg: 900,
            xl: 1200,
        },
    },
});

const darkTheme = createTheme(themeBuilder('dark'));
const lightTheme = createTheme(themeBuilder('light'));

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <>
                <CssBaseline />

                <TopBar setMenuOpen={setMenuOpen} />

                <SettingsDrawer
                    isOpen={menuOpen}
                    setOpen={setMenuOpen}
                    setImageDialogOpen={setDialogOpen}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <ImageDialog isOpen={dialogOpen} setOpen={setDialogOpen} />

                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Game />
                </Container>
            </>
        </ThemeProvider>
    );
}
