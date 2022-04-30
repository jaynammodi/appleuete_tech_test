import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Customers from "./pages/Customers.js";
import Products from "./pages/Products.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customers" element={<Customers />}/>
        <Route path="/products" element={<Products />}/>
      </Routes>
    </Router>
  );
}

export default App;
