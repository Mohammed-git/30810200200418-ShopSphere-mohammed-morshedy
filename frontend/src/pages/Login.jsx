import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Login() {

    const navigate = useNavigate();
const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        try {

            const data = await login(email, password);

            
            auth.login(data.token, data.user);

alert("Login Successful!");

navigate("/");



        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    }

    return (

    <div className="auth-page">

        <form
            className="auth-card"
            onSubmit={handleLogin}
        >

            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button type="submit">
                Login
            </button>

        </form>

</div>

);
}

export default Login;