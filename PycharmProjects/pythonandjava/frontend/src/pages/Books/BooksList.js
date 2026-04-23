import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  const API_URL = "http://localhost:5002";

  useEffect(() => {
    fetch(`${API_URL}/book/books`)
      .then(res => res.json())
      .then(data => {
        console.log("BOOKS FROM API:", data);
        setBooks(data);
      })
      .catch(err => console.error("BooksList ERROR:", err));
  }, []);

  const increase = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const decrease = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  const add = (book) => {
    const qty = quantities[book.id] || 1;

    // ✅ SAFELY NORMALIZE BOOK FOR CART
    const cartBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      price: Number(book.price),
    };

    console.log("ADDING TO CART:", cartBook, "QTY:", qty);

    addToCart(cartBook, qty);

    alert(`✅ Added ${qty} × "${book.title}" to cart`);

    setQuantities(prev => ({ ...prev, [book.id]: 1 }));
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>📚 All Books</h1>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >
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
              <p><strong>Book Type:</strong> {book.typeOfBook}</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => decrease(book.id)}>−</button>
                <strong>{quantities[book.id] || 1}</strong>
                <button onClick={() => increase(book.id)}>+</button>
              </div>

              <button
                onClick={() => add(book)}
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "8px",
                  cursor: "pointer"
                }}
              >
                🛒 Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksList;