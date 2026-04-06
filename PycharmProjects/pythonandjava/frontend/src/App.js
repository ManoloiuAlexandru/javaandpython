import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Books from "./pages/Books/Books";
import BooksList from "./pages/Books/BooksList";
import AddBook from "./pages/Books/AddBook";
import AddLibrary from "./pages/Books/AddLibrary";
import BookStats from "./pages/Books/BookStats";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/list" element={<BooksList />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/add-library" element={<AddLibrary />} />
        <Route path="/books/stats" element={<BookStats />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;