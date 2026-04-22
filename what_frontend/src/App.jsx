import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Record from "./pages/Record.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./elements/Navbar.jsx";
function App() {
  return (
    <Router>
      <div className="lexend-exa">
        <header className="header">
          <h1 className="margin0"> Disqueria What?</h1>
        </header>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Catalogue />} />
            <Route path="/record/:recordId" element={<Record />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
