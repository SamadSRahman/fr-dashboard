import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <div className="main-container">
    <Sidebar />
      <Header />
      <App />
    </div>
    </BrowserRouter>
  </StrictMode>
);
