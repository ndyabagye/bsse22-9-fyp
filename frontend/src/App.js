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
  // const [token ,setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Router>
      <Routes>
        {/* authentication */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* customer */}
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route path="/category/:id" element={<SingleProduct />} />
          {/* admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addProducts" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
