import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { Page2 } from "./page2/Page2";
const Reactapp2 = React.lazy(() => import("app2/App"));

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/page2",
    element: <Page2 />,
  },
  {
    path: "/reactapp2",
    element: <Suspense fallback={<p>Loading...</p>}> <Reactapp2 /></Suspense>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
