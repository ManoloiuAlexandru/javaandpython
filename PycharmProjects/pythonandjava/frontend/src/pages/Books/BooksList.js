import { useEffect, useState } from "react";

function BooksList() {
  const [books, setBooks] = useState([]);
  const API_URL = "http://localhost:5002";

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("BooksList ERROR:", err));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>📚 All Books</h1>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {books.map(book => (
            <div
              key={book.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                backgroundColor: "#fff"
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{book.title}</h3>

              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Pages:</strong> {book.pages}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Sold:</strong> {book.sold}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksList;