import { Link } from "react-router-dom";

function Books() {
  const containerStyle = {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial"
  };

  const cardStyle = {
    padding: "25px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.2s",
    textDecoration: "none",
    color: "black"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "10px" }}>📖 Books Dashboard</h1>
      <p style={{ marginBottom: "30px", color: "#555" }}>
        Manage your entire book collection
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        <Link to="/books/list" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            📚
            <h2>All Books</h2>
            <p>View your entire collection</p>
          </div>
        </Link>

        <Link to="/books/add" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            ➕
            <h2>Add Book</h2>
            <p>Add a new book to the library</p>
          </div>
        </Link>

        <Link to="/books/add-library" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            📦
            <h2>Add Library</h2>
            <p>Add multiple books at once</p>
          </div>
        </Link>

        <Link to="/books/stats" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            📊
            <h2>Statistics</h2>
            <p>View insights and analytics</p>
          </div>
        </Link>

        {/* ✅ CART CARD */}
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div
            style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            🛒
            <h2>Cart</h2>
            <p>Review your selected books</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Books;