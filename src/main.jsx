// src/index.js
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";         // <-- Import so i18next is initialized
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Our configured i18n instance

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading translations…</div>}>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);
