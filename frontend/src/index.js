import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
// import Navbar from './components/shared/Navbar';
// import Layout from './components/Layout/Layout';
// import Home from './pages/Home';
// import SingleProductPage from './pages/SingleProductPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

