import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.js";

export default function Profile() {
  const { userid, username } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userid) {
      fetchBooks();
    }
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userid}/borrowed_books`
      );
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        setErrorMessage("Failed to fetch books.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setErrorMessage("An error occurred while fetching books.");
    }
  }

  return (
    <div className="profile-container">
      <h1> Welcome {username}</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>No books found for this user.</p>
      )}
    </div>
  );
}
