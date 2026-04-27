const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg,#f5f7fa,#c3cfe2)",
  },

  title: {
    textAlign: "center",
  },

  addAccountButton: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#4CAF50",
    color: "#fff",
    margin: "20px auto",
    display: "block",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#4CAF50",
    color: "#fff",
  },

  buttonBlue: {
    background: "#2196F3",
    marginBottom: "10px",
  },

  buttonPurple: {
    background: "#673AB7",
    marginTop: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    width: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  cardItem: {
    position: "relative",
    marginTop: "6px",
    padding: "8px",
    background: "#f3f3f3",
    borderRadius: "8px",
    cursor: "pointer",
  },

  cardTooltip: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: "6px",
    background: "#333",
    color: "#fff",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "12px",
    zIndex: 10,
  },

  message: {
    textAlign: "center",
    marginTop: "20px",
  },
  ordersContainer: {
    marginTop: "40px",
  },

  orderCard: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    marginBottom: "10px",
  },

  payButton: {
    marginTop: "10px",
    background: "#FF9800",
  },

  select: {
    padding: "8px",
    borderRadius: "8px",
    marginTop: "8px",
    border: "1px solid #ccc",
  },
};

export default styles;