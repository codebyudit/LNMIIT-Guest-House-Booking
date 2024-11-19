import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./context/Context.jsx";
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MyProvider>
      <Toaster position="top-center" reverseOrder={false}/>
      <App />
    </MyProvider>
  </BrowserRouter>
);
