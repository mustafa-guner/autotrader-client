import React from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import theme from './core/theme/theme';
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </ChakraProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
