import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const API_URL = "http://localhost:5002";
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { name, password };

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Login successful!");
                // Example redirect after login
                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                setMessage(data.message || "Invalid credentials.");
            }
        } catch (err) {
            console.error("Login ERROR:", err);
            setMessage("Login failed.");
        }
    };

    const containerStyle = {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        fontFamily: "Arial"
    };

    const cardStyle = {
        background: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        width: "320px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    };

    const inputStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none"
    };

    const buttonStyle = {
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        background: "#2196F3",
        color: "white",
        cursor: "pointer",
        transition: "0.2s"
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={cardStyle}>
                <h2 style={{ textAlign: "center" }}>🔐 Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={e => e.currentTarget.style.background = "#1976D2"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2196F3"}
                >
                    Login
                </button>

                {message && (
                    <p style={{ textAlign: "center", marginTop: "10px" }}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Login;