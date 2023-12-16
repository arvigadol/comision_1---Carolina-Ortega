import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import Navbar from "./components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter> 
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
);
