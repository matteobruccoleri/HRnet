import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import "./index.css";
import { EmployeesProvider } from "./state/EmployeesStore";

// On enveloppe toute l'application avec le Provider
// → rend le state global accessible partout (formulaire, liste, etc.)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeesProvider>
      <RouterProvider router={router} />
    </EmployeesProvider>
  </React.StrictMode>
);
