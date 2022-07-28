import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import { ServerProvider } from "./context";
import App from "./App";
import ErrorBoundary from "components/ErrorBoundary";
import * as server from "./servers";

import "normalize.css";
import "antd/dist/antd.css";
import "styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <ServerProvider value={server}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ServerProvider>
  </ErrorBoundary>
);
