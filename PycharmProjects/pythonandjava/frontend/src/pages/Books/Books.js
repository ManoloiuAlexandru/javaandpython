import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/booksStyles";

function Books() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={handleGoBack}>
          ⬅ Home
        </button>

        <h1 style={styles.title}>📖 Books Dashboard</h1>
        <p style={styles.subtitle}>Manage your entire book collection</p>

        <div style={styles.grid}>
          <Link to="/books/list" style={styles.link}>
            <div
                style={styles.card}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
              📚
              <h2>All Books</h2>
              <p>View your entire collection</p>
            </div>
          </Link>

          <Link to="/books/add" style={styles.link}>
            <div
                style={styles.card}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
              ➕
              <h2>Add Book</h2>
              <p>Add a new book to the library</p>
            </div>
          </Link>

          <Link to="/books/add-library" style={styles.link}>
            <div
                style={styles.card}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
              📦
              <h2>Add Library</h2>
              <p>Add multiple books at once</p>
            </div>
          </Link>

          <Link to="/books/stats" style={styles.link}>
            <div
                style={styles.card}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
              📊
              <h2>Statistics</h2>
              <p>View insights and analytics</p>
            </div>
          </Link>

          <Link to="/cart" style={styles.link}>
            <div
                style={styles.card}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
              🛒
              <h2>Cart</h2>
              <p>Review your selected books</p>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default Books;