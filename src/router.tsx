import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { Page2 } from "./page2/Page2";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/page2",
    element: <Page2 />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
