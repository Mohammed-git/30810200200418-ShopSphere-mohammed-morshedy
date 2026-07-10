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
function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Products />} />
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
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;