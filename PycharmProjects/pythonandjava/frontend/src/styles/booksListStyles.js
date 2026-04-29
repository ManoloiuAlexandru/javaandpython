// booksListStyles.js
export const styles = {
    page: {
        padding: "30px",
        fontFamily: "Arial",
    },

    headerRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "20px",
    },

    title: {
        margin: 0,
    },

    backButton: {
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        cursor: "pointer",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
    },

    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
    },

    bookTitle: {
        marginBottom: "10px",
    },

    qtyRow: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
        alignItems: "center",
    },

    addButton: {
        marginTop: "12px",
        width: "100%",
        padding: "8px",
        cursor: "pointer",
    },
};

export default styles;