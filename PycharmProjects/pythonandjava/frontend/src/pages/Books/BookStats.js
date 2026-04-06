import { useEffect, useState } from "react";

function BookStats() {
  const API_URL = "http://localhost:5002";

  const [mostExpensive, setMostExpensive] = useState(null);
  const [mostCheap, setMostCheap] = useState(null);
  const [longestBook, setLongestBook] = useState(null);
  const [oldestBook, setOldestBook] = useState(null);
  const [newestBook, setNewestBook] = useState(null);
  const [mostSold, setMostSold] = useState(null);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/get_most_expensive`)
      .then(res => res.json())
      .then(data => setMostExpensive(data))
      .catch(err => console.error("Most Expensive ERROR:", err));

    fetch(`${API_URL}/get_most_cheap`)
      .then(res => res.json())
      .then(data => setMostCheap(data))
      .catch(err => console.error("Most Cheap ERROR:", err));

    fetch(`${API_URL}/get_longest_book`)
      .then(res => res.json())
      .then(data => setLongestBook(data))
      .catch(err => console.error("Longest ERROR:", err));

    fetch(`${API_URL}/get_oldest`)
      .then(res => res.json())
      .then(data => setOldestBook(data))
      .catch(err => console.error("Oldest ERROR:", err));

    fetch(`${API_URL}/get_newest`)
      .then(res => res.json())
      .then(data => setNewestBook(data))
      .catch(err => console.error("Newest ERROR:", err));

    fetch(`${API_URL}/get_most_sold`)
      .then(res => res.json())
      .then(data => setMostSold(data))
      .catch(err => console.error("Most Sold ERROR:", err));

    fetch(`${API_URL}/get_genres`)
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(err => console.error("Genres ERROR:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Stats</h1>

      {mostExpensive && (
        <p><strong>Most Expensive:</strong> {mostExpensive.title} — ${mostExpensive.price}</p>
      )}
      {mostCheap && (
        <p><strong>Cheapest:</strong> {mostCheap.title} — ${mostCheap.price}</p>
      )}
      {longestBook && (
        <p><strong>Longest:</strong> {longestBook.title} — {longestBook.pages} pages</p>
      )}
      {oldestBook && (
        <p><strong>Oldest:</strong> {oldestBook.title} — {oldestBook.year}</p>
      )}
      {newestBook && (
        <p><strong>Newest:</strong> {newestBook.title} — {newestBook.year}</p>
      )}
      {mostSold && (
        <p><strong>Most Sold:</strong> {mostSold.title} — sold {mostSold.sold || "N/A"}</p>
      )}

      {genres && Object.keys(genres).length > 0 && (
        <div>
          <h3>Most Popular Genres</h3>
          <ul>
            {Object.entries(genres).map(([genre, count]) => (
              <li key={genre}>{genre}: {count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookStats;