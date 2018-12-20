import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import App from "./components/app";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSortUp as fasSortUp,
  faSortDown as fasSortDown
} from "@fortawesome/free-solid-svg-icons";
import {
  faFrown as farFrown,
  faSmile as farSmile
} from "@fortawesome/free-regular-svg-icons";
library.add(fasSortUp, fasSortDown, farFrown, farSmile);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
