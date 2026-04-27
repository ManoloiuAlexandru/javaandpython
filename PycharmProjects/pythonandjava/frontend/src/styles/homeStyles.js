const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #eef2f7, #d9e2ec)",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    marginBottom: "20px",
  },

  subtitle: {
    color: "#555",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "30px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    color: "black",
  },

  smallCard: {
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 5px 12px rgba(0,0,0,0.06)",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    color: "black",
  },

  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#e53935",
    color: "#fff",
    cursor: "pointer",
  },
};

export default styles;