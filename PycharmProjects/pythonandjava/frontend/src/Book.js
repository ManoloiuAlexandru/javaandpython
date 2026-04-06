import { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const API_URL = "http://localhost:5002";

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("ERROR:", err));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {book.title} by {book.author} — {book.pages} pages — ${book.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Books;