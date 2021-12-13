import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Frame} from '@shopify/polaris';
import './app.css';
 
ReactDOM.render(
    <AppProvider i18n={enTranslations}>
        <Frame>
            <App />
        </Frame>
    </AppProvider>,
    document.getElementById("app")
);
