import React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.css';
import App from './App';
import I18NProvider, { loadLocaleData } from './services/i18n/I18NProvider';

const theme = createTheme({ direction: 'rtl' });

(async () => {
    const messages = await loadLocaleData();

    ReactDOM.render(
        <React.StrictMode>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <I18NProvider messages={messages}>
                        <App />
                    </I18NProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();
