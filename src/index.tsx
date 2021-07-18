import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: lightGreen[200],
        },
        tonalOffset:
        {
            light: .4,
            dark: .2,
        },
    }
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <>
                <CssBaseline />
                <App />
            </>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
