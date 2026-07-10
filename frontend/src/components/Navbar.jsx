import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    }

    return (

        <nav className="navbar">

    <div className="container navbar-content">

        <h2 className="logo">
            TechStore
        </h2>

        <div className="nav-links">

            <Link to="/">Home</Link>

<Link to="/cart">Cart</Link>

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
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>

                )
            }

        </div>

    </div>

</nav>

    );

}

export default Navbar;