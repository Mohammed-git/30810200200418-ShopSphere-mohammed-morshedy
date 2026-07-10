import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {

        e.preventDefault();

        try {

            await register(name, email, password);

            alert("Account created successfully!");

            navigate("/login");

        } catch (error) {

            alert(error.response?.data?.message || "Register failed");

        }

    }

    return (

    <div className="auth-page">

        <form
            className="auth-card"
            onSubmit={handleRegister}
        >

            <h1>Register</h1>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

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
                Register
            </button>

        </form>

    </div>

    );

}

export default Register;