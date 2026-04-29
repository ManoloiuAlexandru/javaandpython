const styles = {
    container: {
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        fontFamily: "Arial",
    },

    backButton: {
        marginBottom: "20px",
    },

    title: {
        marginBottom: "10px",
    },

    subtitle: {
        marginBottom: "30px",
        color: "#555",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
    },

    card: {
        padding: "25px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
        cursor: "pointer",
        transition: "0.2s",
        color: "black",
    },

    link: {
        textDecoration: "none",
    },
};
export default styles;