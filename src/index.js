
import React from "react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from "./App";
import { ContextProvider } from './Context/Context'
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(

    <ContextProvider>
      <App />
    </ContextProvider>

);

reportWebVitals();