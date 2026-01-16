import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/globals.css"; // ← IMPORTA AQUI
import App from "./app/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
