import React from 'react';
import ReactDOM from 'react-dom';
import AsapProviders from './shared/services/AsapProviders';
import App from './App';
import { loadLocaleData } from './shared/services/i18n/I18NProvider';
import './index.css';

(async () => {
    const messages = await loadLocaleData();

    ReactDOM.render(
        <React.StrictMode>
            <AsapProviders messages={messages}>
                <App />
            </AsapProviders>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();
