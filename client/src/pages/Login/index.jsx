import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext.js";
import { useNavigate } from "react-router-dom";
import "./login.css";
const apiUrl = `${import.meta.env.VITE_API_URL}/login`;

export default function Login() {
  const { username, setUsername, setUserId } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsPopupOpen(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.username }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.name);
        setUserId(data.userId);
      } else if (response.status === 404) {
        setErrorMessage("User not found.");
        setUsername(null);
        setUserId(null);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setUsername(null);
        setUserId(null);
      }
    } catch (error) {
      setUsername(null);
      console.error("Error during login:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    }
  }
  const closePopup = () => {
    setIsPopupOpen(false);
    navigate("/profile");
  };
  return (
    <div className="login-container">
      {username ? <p>Logged in as: {username}</p> : null}
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
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Welcome Authors{username}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
