import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Footer from "./components/footer/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Routes>
    <Route path={"/"} element={<App/>}/>
  </Routes>
   <Footer/>
  </BrowserRouter>
);
