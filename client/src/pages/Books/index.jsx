import { useState, useEffect } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [quantityBorrowed, setQuantityBorrowed] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("books not found.");
        setBooks([]);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setBooks([]);
      }
    } catch (error) {
      setBooks([]);
      console.error("Error during books:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }

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
      console.error("Error during fetching quantity:", error);
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
      {books.length > 0 ? (
        <ul>
          {books.map((book) => {
            const borrowedQuantity = quantityBorrowed[book.id];
            return (
              <li key={book.id}>
                {book.title} - {borrowedQuantity}/{book.quantity}
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
