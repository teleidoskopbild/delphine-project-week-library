import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx"; // Import UserContext

export default function Books() {
  const { userData, setUserData } = useContext(UserContext); // Check if the user is logged in
  const [books, setBooks] = useState([]);
  const [quantityBorrowed, setQuantityBorrowed] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { userId } = userData || {};

  // Fetch books from the server
  async function fetchBooks() {
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:3000/books", {
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
        `http://localhost:3000/books/available_qty?fk_book_id=${bookId}`,
        {
          method: "GET",
        }
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
      const response = await fetch("http://localhost:3000/books/borrow", {
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
              <li key={book.id}>
                {book.title} - {availableQty}/{book.quantity}
                {userId && availableQty > 0 ? (
                  <button onClick={() => handleBorrow(book.id)}>
                    Borrow Book
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}
