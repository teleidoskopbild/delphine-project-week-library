import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Authors.css";
import Error from "../../Error/Error";
function BooksByAuthors() {
  const { authorId } = useParams();
  const location = useLocation();
  const { authorName } = location.state;
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/authors`;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${apiUrl}/${authorId}/books`);
        if (response.ok) {
          const data = await response.json();
          setBooks(data.booksByAuthors);
        } else if (response.status === 404) {
          setError("Books from Author not found.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching quantity:", error);
        setError("An internal error occurred. Please try again.");
      }
    }

    fetchBooks();
  }, [authorId]);

  return (
    <div className="booksAuthors-container">
      <h2>Books by Author {authorName}</h2>
      <Error message={error} /> {/* Display error using Error component */}
      <ul>
        {books.map((book) => (
          <li key={book.bookTitle}>
            <div className="thumbnail">
              {/* <img src={`/thumbnails/${book.id}.jpg`} /> */}
            </div>
            {book.bookTitle}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksByAuthors;
