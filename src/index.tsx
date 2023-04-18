import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Modal from "./components/modal/Modal";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <App />
    <Modal />
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
