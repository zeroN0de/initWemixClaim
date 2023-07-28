import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Claims from "./Claims";
import Ratio from "./Ratio";
import Withdraw from "./Withdraw";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Claims />
    {/* <App /> */}
    <Ratio />
    <Withdraw />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
