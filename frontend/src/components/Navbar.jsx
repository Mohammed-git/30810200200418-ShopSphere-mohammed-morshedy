import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const token = localStorage.getItem("token");

    
    return (

        <nav className="navbar">

            <div className="container navbar-content">

                <h2 className="logo">

                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                    >
                        TechStore
                    </Link>

                </h2>

                <div className="nav-links">

                    <Link to="/">Home</Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/cart">
                        Cart
                    </Link>

                    {
                        user?.role === "admin" && (

                            <Link to="/admin">

                                Admin

                            </Link>

                        )
                    }

                    {

                        token ? (

                            <button
                                className="logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        ) : (

                            <>

                                <Link to="/login">
                                    Login
                                </Link>

                                <Link to="/register">
                                    Register
                                </Link>

                            </>

                        )

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;