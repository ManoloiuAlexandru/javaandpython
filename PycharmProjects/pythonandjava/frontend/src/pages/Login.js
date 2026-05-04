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

        if (res.ok && data.token) {
            // ✅ SAVE TOKEN
            localStorage.setItem("token", data.token);

            setMessage("Login successful!");
            setTimeout(() => navigate("/"), 1000);
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
        background: "radial-gradient(circle at top left, rgba(37,99,235,0.28), transparent 34%), linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "24px"
    };

    const cardStyle = {
        background: "rgba(255,255,255,0.96)",
        padding: "42px",
        borderRadius: "26px",
        boxShadow: "0 28px 80px rgba(15,23,42,0.35)",
        width: "min(420px, 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: "1px solid rgba(255,255,255,0.58)"
    };

    const inputStyle = {
        padding: "13px 14px",
        borderRadius: "14px",
        border: "1px solid #cbd5e1",
        outline: "none",
        background: "#f8fafc"
    };

    const buttonStyle = {
        padding: "13px",
        borderRadius: "14px",
        border: "none",
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        color: "white",
        cursor: "pointer",
        transition: "0.2s",
        fontWeight: 700,
        boxShadow: "0 16px 32px rgba(37,99,235,0.26)"
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={cardStyle}>
                <h2 style={{ textAlign: "center", margin: 0, fontSize: "32px", letterSpacing: "-0.04em" }}>🔐 Welcome back</h2>
                <p style={{ textAlign: "center", color: "#64748b", marginTop: 0 }}>
                    Sign in to manage your library and orders.
                </p>

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
                >
                    Sign In
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