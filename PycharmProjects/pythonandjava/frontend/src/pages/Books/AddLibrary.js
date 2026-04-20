import { useState } from "react";
import { Link } from "react-router-dom";

function AddLibrary() {
  const API_URL = "http://localhost:5002";

  const emptyBook = {
    title: "",
    author: "",
    year: "",
    pages: "",
    genre: "",
    price: "",
    sold: "",
    typeOfBook: ""
  };

  const [books, setBooks] = useState([emptyBook]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const newBooks = [...books];
    newBooks[index][field] = value;
    setBooks(newBooks);
  };

  const addBookForm = () => setBooks([...books, emptyBook]);

  const removeBookForm = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedBooks = books.map(b => ({
      title: b.title,
      author: b.author,
      year: parseInt(b.year),
      pages: parseInt(b.pages),
      genre: b.genre,
      price: parseFloat(b.price),
      sold: parseInt(b.sold),
      typeOfBook: b.typeOfBook
    }));

    try {
      const res = await fetch(`${API_URL}/book/add_library`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedBooks)
      });

      const data = await res.json();
      setMessage(data.message);
      setBooks([emptyBook]);
    } catch (err) {
      console.error("AddLibrary ERROR:", err);
      setMessage("Failed to add library.");
    }
  };

  // 🎨 Styles
  const container = {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial"
  };

  const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const input = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px"
  };

  const button = {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={container}>
      {/* Back */}
      <Link to="/books">
        <button style={{ ...button, background: "#eee", marginBottom: "20px" }}>
          ⬅ Back
        </button>
      </Link>

      <h1 style={{ marginBottom: "20px" }}>📦 Add Library</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {books.map((book, index) => (
          <div key={index} style={card}>
            <h3>Book #{index + 1}</h3>

            <div style={grid}>
              <input style={input} placeholder="Title" value={book.title} onChange={e => handleChange(index, "title", e.target.value)} required />
              <input style={input} placeholder="Author" value={book.author} onChange={e => handleChange(index, "author", e.target.value)} required />
              <input style={input} type="number" placeholder="Year" value={book.year} onChange={e => handleChange(index, "year", e.target.value)} required />
              <input style={input} type="number" placeholder="Pages" value={book.pages} onChange={e => handleChange(index, "pages", e.target.value)} required />
              <input style={input} placeholder="Genre" value={book.genre} onChange={e => handleChange(index, "genre", e.target.value)} required />
              <input style={input} type="number" placeholder="Price" value={book.price} onChange={e => handleChange(index, "price", e.target.value)} required />
              <input style={input} type="number" placeholder="Sold" value={book.sold} onChange={e => handleChange(index, "sold", e.target.value)} required />
              <input style={input} placeholder="Type of Book" value={book.typeOfBook} onChange={e => handleChange(index, "typeOfBook", e.target.value)} required />
            </div>

            {books.length > 1 && (
              <button
                type="button"
                onClick={() => removeBookForm(index)}
                style={{ ...button, background: "#ff6b6b", color: "white" }}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addBookForm} style={{ ...button, background: "#4dabf7", color: "white" }}>
          ➕ Add Another Book
        </button>

        <button type="submit" style={{ ...button, background: "#51cf66", color: "white" }}>
          ✅ Submit Library
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddLibrary;