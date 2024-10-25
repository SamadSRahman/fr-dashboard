import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';
import { CustomProvider } from 'rsuite';

const isLoggedin = localStorage.getItem("isLoggedin");

createRoot(document.getElementById("root")).render(
 
  <CustomProvider >
    <BrowserRouter>
    {isLoggedin ? <div className="main-container">
      <Sidebar/>
        <Header />
        <App />
      </div>
      :
        <App/>
      } 
    </BrowserRouter>
    </CustomProvider>

);
