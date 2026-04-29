import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { styles } from "../../styles/booksListStyles"; // adjust path if needed

function BooksList() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const API_URL = "http://localhost:5002";

  useEffect(() => {
    fetch(`${API_URL}/book/books`)
        .then((res) => res.json())
        .then((data) => {
          console.log("BOOKS FROM API:", data);
          setBooks(data);
        })
        .catch((err) => console.error("BooksList ERROR:", err));
  }, []);

  const increase = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const add = (book) => {
    const qty = quantities[book.id] || 1;

    const cartBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      price: Number(book.price),
    };

    console.log("ADDING TO CART:", cartBook, "QTY:", qty);
    addToCart(cartBook, qty);

    alert(`✅ Added ${qty} × "${book.title}" to cart`);

    setQuantities((prev) => ({ ...prev, [book.id]: 1 }));
  };

  const goBack = () => {
    navigate(-1); // 👈 back in history
  };

  return (
      <div style={styles.page}>
        <div style={styles.headerRow}>
          <button onClick={goBack} style={styles.backButton}>
            ← Back
          </button>

          <h1 style={styles.title}>📚 All Books</h1>

          {/* spacer to keep title centered nicely (optional) */}
          <div style={{ width: 70 }} />
        </div>

        {books.length === 0 ? (
            <p>No books found</p>
        ) : (
            <div style={styles.grid}>
              {books.map((book) => (
                  <div key={book.id} style={styles.card}>
                    <h3 style={styles.bookTitle}>{book.title}</h3>

                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Pages:</strong> {book.pages}</p>
                    <p><strong>Price:</strong> ${book.price}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Sold:</strong> {book.sold}</p>
                    <p><strong>Book Type:</strong> {book.typeOfBook}</p>

                    <div style={styles.qtyRow}>
                      <button onClick={() => decrease(book.id)}>−</button>
                      <strong>{quantities[book.id] || 1}</strong>
                      <button onClick={() => increase(book.id)}>+</button>
                    </div>

                    <button onClick={() => add(book)} style={styles.addButton}>
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
