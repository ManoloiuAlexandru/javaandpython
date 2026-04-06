import { Link } from "react-router-dom";

function Home() {
  const cardStyle = {
    padding: "30px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.2s",
    textDecoration: "none",
    color: "black"
  };

  const containerStyle = {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "10px" }}>📚 My Personal Library</h1>
      <p style={{ marginBottom: "30px", color: "#555" }}>
        Manage your books, users, and collections
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        <Link to="/users" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            👤
            <h2>Users</h2>
            <p>View and manage users</p>
          </div>
        </Link>

        <Link to="/books" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            📖
            <h2>Books</h2>
            <p>Browse and manage your library</p>
          </div>
        </Link>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            ➕
            <h2>Signup</h2>
            <p>Create a new user account</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;