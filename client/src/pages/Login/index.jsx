import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ username: "" });
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.username }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);
      } else if (response.status === 404) {
        setErrorMessage("User not found.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Benutzername:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p> {errorMessage}</p>
    </div>
  );
}
