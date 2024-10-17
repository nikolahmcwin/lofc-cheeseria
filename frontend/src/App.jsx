/**
 * Simple frontend SPA for LoFC Cheeseria POC.
 *
 * @author Nikolah McWin
 * October 2024
 *
 * NOTE:
 * First time using React and React Router. It probably shows.
 * Need to come back and read best practices and usage docs more.
 * Initial focus was to get it working, learning as I go.
 * Next focus is to learn more, look at good vs bad practices, and refactor.
 * Need to add error page handling
 * CheeseDetails should probably be designed as a child route instead
 * Also need some kind of search bar / list instead of just gallery
 */

//CSS
import "./App.css";

// Components
import Header from "./components/Header";
import Line from "./components/Line";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Cheeses from "./pages/Cheeses";
import CheeseDetails from "./pages/CheeseDetails";
import Calculator from "./pages/Calculator";
import About from "./pages/About";

// React Router
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
            <Route path="/cheeses/:id" element={<CheeseDetails />} />
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
