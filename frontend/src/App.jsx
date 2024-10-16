import "./App.css";

import Header from "./components/Header";
import Line from "./components/Line";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cheeses from "./pages/Cheeses";
import Calculator from "./pages/Calculator";
import About from "./pages/About";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <Line />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cheeses" element={<Cheeses />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Line />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
