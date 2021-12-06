import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import './app.css';
 
ReactDOM.render(
    <AppProvider i18n={enTranslations}>
        <App />
    </AppProvider>,
    document.getElementById("app")
);
