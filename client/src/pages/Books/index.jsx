import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext.js";

export default function Books() {
  const { username, setUsername } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchBooks() {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else if (response.status === 404) {
        setErrorMessage("books not found.");
        setBooks(null);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setBooks(null);
      }
    } catch (error) {
      setBooks(null);
      console.error("Error during books:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }

  async function fetchquantity() {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else if (response.status === 404) {
        setErrorMessage("books not found.");
        setBooks(null);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setBooks(null);
      }
    } catch (error) {
      setBooks(null);
      console.error("Error during books:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="books-container">
      <h2>Books List</h2>

      {errorMessage && <p>{errorMessage}</p>}

      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              {book.title}
              {books.quantity}/{borrowed_books}
            </li>
          ))}
        </ul>
      ) : (
        !errorMessage && <p>No books available.</p>
      )}
    </div>
  );
}
