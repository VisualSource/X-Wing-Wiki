import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReloadPrompt from "./components/ReloadPrompt";
import routes from "./routes";
import "./index.css";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
      <ReloadPrompt />
    </>
  </React.StrictMode>,
);
