import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['Customers', 'Products', 'Orders'];

const Home = () => {

  return (
    <p>
    Problem Statement:
    Node - Create following APIs
GET -> Customer
GET -> Orders (A customer can have N number of Orders)
GET -> Products (An order can have N number of products, please maintain SKU id to identify identical products)               
POST/PATCH -> Products update (Updating products based on ID, A product can have N number of quantity)
POST/PATCH -> Order Update

Relationships

Orders and Products
1 – Many

Customer and Orders
1 – Many

For Product POST/PATCH API, the user can update quantity as well as status(Processing, Done) of the product

React

Should have a screen listing all orders against a customer.
Allow editing the quantity in frontend and also update the status from frontend.
 
Please add at least 4 rows of data for Orders and 10 for products.
    </p>
  );
};
export default Home;
