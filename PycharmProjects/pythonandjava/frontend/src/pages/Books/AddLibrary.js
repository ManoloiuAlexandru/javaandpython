import { useState } from "react";

function AddLibrary() {
  const API_URL = "http://localhost:5002";

  const [books, setBooks] = useState([
    { title: "", author: "", year: "", pages: "", genre: "", price: "" }
  ]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const newBooks = [...books];
    newBooks[index][field] = value;
    setBooks(newBooks);
  };

  const addBookForm = () => {
    setBooks([...books, { title: "", author: "", year: "", pages: "", genre: "", price: "" }]);
  };

  const removeBookForm = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedBooks = books.map(b => ({
      title: b.title,
      author: b.author,
      year: parseInt(b.year),
      pages: parseInt(b.pages),
      genre: b.genre,
      price: parseFloat(b.price)
    }));

    try {
      const res = await fetch(`${API_URL}/add_library`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedBooks)
      });

      const data = await res.json();
      setMessage(data.message);

      setBooks([{ title: "", author: "", year: "", pages: "", genre: "", price: "" }]);
    } catch (err) {
      console.error("AddLibrary ERROR:", err);
      setMessage("Failed to add library.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Library</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {books.map((book, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <input type="text" placeholder="Title" value={book.title} onChange={e => handleChange(index, "title", e.target.value)} required />
            <input type="text" placeholder="Author" value={book.author} onChange={e => handleChange(index, "author", e.target.value)} required />
            <input type="number" placeholder="Year" value={book.year} onChange={e => handleChange(index, "year", e.target.value)} required />
            <input type="number" placeholder="Pages" value={book.pages} onChange={e => handleChange(index, "pages", e.target.value)} required />
            <input type="text" placeholder="Genre" value={book.genre} onChange={e => handleChange(index, "genre", e.target.value)} required />
            <input type="number" placeholder="Price" value={book.price} onChange={e => handleChange(index, "price", e.target.value)} required />
            {books.length > 1 && (
              <button type="button" onClick={() => removeBookForm(index)} style={{ marginTop: "5px" }}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addBookForm}>Add Another Book</button>
        <button type="submit" style={{ marginTop: "10px" }}>Submit Library</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default AddLibrary;