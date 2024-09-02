import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "./config";

const domain = process.env.DOMAIN;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <Auth0Provider
  //   domain={config.domain}
  //   clientId={config.clientId}
  //   authorizationParams={{
  //     redirect_uri: config.redirect_uri,
  //   }}
  // >
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // </Auth0Provider>
  <React.StrictMode>
      <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
