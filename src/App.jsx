import { BrowserRouter as Router, Routes, Route } from "react-router";
import Record from "./pages/Record.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Cart from "./pages/Cart.jsx";
import PaymentSuccess from './pages/Payment_success.jsx';
import PaymentFailed from './pages/Payment_failed.jsx';
import About from './pages/About.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <header className="app-header">
          <h1>Disqueria What?</h1>
          <span>Vinyl Records</span>
        </header>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Catalogue />} />
            <Route path="/record/:recordId" element={<Record />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
