import { useState, useEffect } from "react";
// Use the VITE_API_URL environment variable for the API base URL
const apiUrl = `${import.meta.env.VITE_API_URL}/authors`;

function Authors() {
  const [authors, setAuthors] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch authors data from the backend using fetch
    fetch(apiUrl) // Adjust the API URL based on your backend setup
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch authors"); // Handle non-200 responses
        }
        return response.json();
      })
      .then((data) => {
        setAuthors(data); // Set the authors data from response
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
