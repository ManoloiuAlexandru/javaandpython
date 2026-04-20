import { useState } from "react";

function AddBook() {
  const API_URL = "http://localhost:5002";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");
  const [typeOfBook, setTypeOfBook] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = {
      title,
      author,
      year: parseInt(year),
      pages: parseInt(pages),
      genre,
      price: parseFloat(price),
      sold: parseInt(sold),
      typeOfBook
    };

    try {
      const res = await fetch(`${API_URL}/book/add_book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      const data = await res.json();
      setMessage(data.message || "Book added!");

      // reset
      setTitle("");
      setAuthor("");
      setYear("");
      setPages("");
      setGenre("");
      setPrice("");
      setSold("");
      setTypeOfBook("");
    } catch (err) {
      console.error("AddBook ERROR:", err);
      setMessage("Failed to add book.");
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
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
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
        <h2 style={{ textAlign: "center" }}>📖 Add New Book</h2>

        <input style={inputStyle} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input style={inputStyle} type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input style={inputStyle} type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <input style={inputStyle} type="number" placeholder="Pages" value={pages} onChange={(e) => setPages(e.target.value)} required />
        <input style={inputStyle} type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <input style={inputStyle} type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input style={inputStyle} type="number" placeholder="Sold" value={sold} onChange={(e) => setSold(e.target.value)} required />

        {/* Better than free text */}
        <select
          style={inputStyle}
          value={typeOfBook}
          onChange={(e) => setTypeOfBook(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="PHYSICAL">Physical</option>
          <option value="EBOOK">Ebook</option>
        </select>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={e => e.currentTarget.style.background = "#1976D2"}
          onMouseLeave={e => e.currentTarget.style.background = "#2196F3"}
        >
          Add Book
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

export default AddBook;