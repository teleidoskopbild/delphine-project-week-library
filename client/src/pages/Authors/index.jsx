//import { useEffect, useState } from "react"; // React hooks
//}
import { useState, useEffect } from "react";
import axios from "axios"; // Axios is used to make HTTP requests

function Authors() {
  const [authors, setAuthors] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch authors data from the backend
    axios
      .get("http://localhost:3000/authors") // Adjust the API URL based on your backend setup
      .then((response) => {
        setAuthors(response.data); // Set the authors data from response
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
        setError("Failed to load authors.");
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  if (loading) {
    return <div>Loading authors...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there is one
  }

  if (!Array.isArray(authors)) {
    return <div>No authors found.</div>; // Safeguard against invalid data
  }

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.name}{" "}
            {/* Assuming the author object has an "id" and "name" field */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Authors;
