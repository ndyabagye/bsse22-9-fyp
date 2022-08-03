import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from "./shared/Header";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/category/:id" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
