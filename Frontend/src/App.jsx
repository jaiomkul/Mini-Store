import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { About } from "./Components/About";
import { Navbar } from "./Components/Navbar/Navbar";
import { Shop } from "./Components/Product/Shop";
import { ProductDetails } from "./Components/Product/ProductDetails";
import LargeWithAppLinksAndSocial from "./Components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/shop/:id" element={<ProductDetails />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <LargeWithAppLinksAndSocial></LargeWithAppLinksAndSocial>
    </div>
  );
}

export default App;
