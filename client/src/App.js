import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Customers from "./pages/Customers.js";
import Products from "./pages/Products.js";
import Orders from "./pages/Orders.js";
import CustomerOrders from "./pages/CustomerOrders.js";
import AppBar from "./pages/AppBar.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customers" element={<Customers />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/customer_orders" element={<CustomerOrders />}/>
      </Routes>
    </Router>
  );
}

export default App;
