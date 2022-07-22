import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import SingleProductPage from './pages/SingleProductPage';
import NotFoundPage from './pages/404';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/about' element={<About/>} exact/>
        <Route path='/product/:id' element={<SingleProductPage/>} exact/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;