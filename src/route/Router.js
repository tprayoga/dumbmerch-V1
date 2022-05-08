import React from "react";
import { Routes, Route } from "react-router-dom";
import Addcategories from "../pages/Addcategories";
import Addproducts from "../pages/Addproducts";
import Admincomplain from "../pages/Admincomplain";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Category from "../pages/Category";
import Complain from "../pages/Complain";
import Detailproduct from "../pages/Detailproduct";
import Editcategories from "../pages/Editcategories";
import Editproducts from "../pages/Editproducts";
import Home from "../pages/Home/Home";
import Products from "../pages/Products";
import Transactions from "../pages/Transactions";

const Router = () => {
  return (
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Transactions />} />
    <Route path="/edit-product/:id" element={<Editproducts />} />
    <Route path="/product" element={<Products />} />
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/detail-product/:id" element={<Detailproduct />} />
    <Route path="/user-complain" element={<Complain />} />
    <Route path="/admin-complain" element={<Admincomplain />} />
    <Route path="/edit-category/:id" element={<Editcategories />} />
    <Route path="/add-category/" element={<Addcategories />} />
    <Route path="/add-product/" element={<Addproducts />} />
    <Route path="/category" element={<Category />} />
  </Routes>
  );
};

export default Router;
