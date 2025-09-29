import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Footer from "./components/footer/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetailsPage from "./pages/product_datails_page/ProductDetailsPage.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Routes>
    <Route path={"/"} element={<App/>}/>
<Route path="/product-details/:productId" element={<ProductDetailsPage />} />
  </Routes>
   <Footer/>
  </BrowserRouter>
);
