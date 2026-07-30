import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import CreateProduct from './pages/CreateProduct';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MisDiscos from './pages/MisDiscos';
import EditProduct from './pages/EditProduct';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1 container-fluid mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/mis-discos" element={<MisDiscos />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;