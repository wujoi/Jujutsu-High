import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { Main } from "./components";

import store from './store';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
   <Router>
      <Provider store={store}>
         <Main />
      </Provider>
   </Router>
)
