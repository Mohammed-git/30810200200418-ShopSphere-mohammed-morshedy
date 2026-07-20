import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
function App() {
    return (
        <>
            <Navbar />
            <Routes>

    <Route path="/" element={<Home />} />

    <Route
        path="/products"
        element={<Products />}
    />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route
        path="/cart"
        element={
            <ProtectedRoute>
                <Cart />
            </ProtectedRoute>
        }
    />

    <Route
        path="/admin"
        element={
            <ProtectedRoute>
                <Admin />
            </ProtectedRoute>
        }
    />

    <Route
        path="/products/:id"
        element={<ProductDetails />}
    />

    <Route
        path="*"
        element={<NotFound />}
    />
    <Route path="/test" element={<h1>TEST PAGE</h1>} />

</Routes>
            <Footer />
        </>
        
    );
}

export default App;