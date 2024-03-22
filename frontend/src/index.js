import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);

reportWebVitals();
