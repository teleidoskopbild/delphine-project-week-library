import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext.js";
import "./books.css";
import BookListItem from "../../components/BookListItem";
const apiUrl = `${import.meta.env.VITE_API_URL}/books`;

export default function Books() {
  const { userId } = useContext(UserContext); // Check if the user is logged in
  const [books, setBooks] = useState([]);
  const [quantityBorrowed, setQuantityBorrowed] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch books from the server
  async function fetchBooks() {
    setErrorMessage("");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else if (response.status === 404) {
        setErrorMessage("Books not found.");
        setBooks([]);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setBooks([]);
      }
    } catch (error) {
      setBooks([]);
      console.error("Error fetching books:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }

  // Fetch available quantity for each book
  async function fetchQuantity(bookId) {
    setErrorMessage("");
    try {
      const response = await fetch(
        `${apiUrl}/available_qty?fk_book_id=${bookId}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setQuantityBorrowed((prev) => ({
          ...prev,
          [bookId]: data.availableQty,
        }));
      } else if (response.status === 404) {
        setErrorMessage("Book not found.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching quantity:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }

  // Borrow book function
  async function handleBorrow(bookId) {
    if (!userId) {
      setErrorMessage("You must be logged in to borrow a book.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, userId }),
      });
      if (response.ok) {
        fetchQuantity(bookId); // Refresh available quantity
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to borrow book. Try again.");
      }
    } catch (error) {
      console.error("Error during borrowing:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      books.forEach((book) => {
        fetchQuantity(book.id);
      });
    }
  }, [books]);

  return (
    <div className="books-container">
      <h2>Books List</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {books.length > 0 ? (
        <ul>
          {books.map((book) => {
            const availableQty = quantityBorrowed[book.id];
            return (
              <BookListItem
                key={book.id}
                book={book}
                availableQty={availableQty}
                borrow={handleBorrow}
              />
            );
          })}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}
