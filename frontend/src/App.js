import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
// import Login from "./auth/Login";
import Header from "./shared/Header";

function App() {
  // const [token ,setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/category/:id" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
