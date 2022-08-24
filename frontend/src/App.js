import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./AdminBackend/pages/Dashboard";
import Landing from "./CustomerLanding/pages/Landing";
import SingleProduct from "./CustomerLanding/pages/SingleProduct";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Users from "./AdminBackend/pages/Users";
import Products from "./AdminBackend/pages/Products";
import AddProductPage from "./AdminBackend/pages/AddProductPage";
// import Login from "./auth/Login";
// import Header from "./Shared/Header";

function App() {

  return (
    <Router>
      <Routes>
        {/* authentication */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* customer */}
        <Route exact path="/landing" element={<Landing />} />
        <Route path="/category/:id" element={<SingleProduct />} />
          {/* admin */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/categories" element={<Products />} />
        <Route path="/admin/brands" element={<Products />} />
        <Route path="/admin/settings" element={<Products />} />
        <Route path="/admin/addProducts" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
