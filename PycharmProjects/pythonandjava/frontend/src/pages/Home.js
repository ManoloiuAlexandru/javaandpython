import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/homeStyles";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // 👈 redirect to homepage
  };

  return (
    <div style={styles.container}>
      {/* AUTH BUTTONS */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        {!isLoggedIn && (
          <>
            <button
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#1976D2",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

            <button
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#43A047",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}

        {isLoggedIn && (
          <button
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              background: "#e53935",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>

      <h1 style={styles.header}>📚 My Personal Library</h1>
      <p style={styles.subtitle}>
        Manage your books, users, and collections
      </p>

      <div style={styles.grid}>
        {/* USERS */}
        <Link to="/users" style={{ textDecoration: "none" }}>
          <div
            style={styles.card}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            👤
            <h2>Users</h2>
            <p>View and manage users</p>
          </div>
        </Link>

        {/* BOOKS */}
        <Link to="/books" style={{ textDecoration: "none" }}>
          <div
            style={styles.card}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            📖
            <h2>Books</h2>
            <p>Browse and manage your library</p>
          </div>
        </Link>

        {/* DASHBOARD (ONLY IF LOGGED IN) */}
        {isLoggedIn && (
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div
              style={styles.card}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              🧠
              <h2>Dashboard</h2>
              <p>Your personal space</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;