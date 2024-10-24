import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext.js";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [quantityBorrowed, setQuantityBorrowed] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //   ----------test---------------
  const objBooks = [
    { title: "Book 1", quantity: 5 },
    { title: "Book 2", quantity: 3 },
    { title: "Book 3", quantity: 7 },
  ];

  const objQuantityBorrowed = [
    { quantity: 2 },
    { quantity: 1 },
    { quantity: 4 },
  ];
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

  //   async function fetchquantity() {
  //     setErrorMessage("");

  //     try {
  //       const response = await fetch("http://localhost:3000/borrowed_books", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setQuantityBorrowed(data);
  //       } else if (response.status === 404) {
  //         setErrorMessage("books not found.");
  //         setQuantityBorrowed(null);
  //       } else {
  //         setErrorMessage("An error occurred. Please try again.");
  //         setQuantityBorrowed(null);
  //       }
  //     } catch (error) {
  //       setQuantityBorrowed(null);
  //       console.error("Error during books:", error);
  //       setErrorMessage("An internal error occurred. Please try again.");
  //     }
  //   }

  useEffect(() => {
    fetchBooks();
    // fetchquantity();
    // setBooks(objBooks);
    setQuantityBorrowed(objQuantityBorrowed);
  }, []);

  return (
    <div className="books-container">
      <h2>Books List</h2>

      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => {
            const borrowedQuantity = quantityBorrowed[index]
              ? quantityBorrowed[index].quantity
              : 0;
            return (
              <li key={index}>
                {book.title} - {book.quantity}/{borrowedQuantity}
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
