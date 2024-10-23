import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext.js";

export default function Login() {
  const { username, setUsername } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setUsername(formData.username);
    console.log(formData.username);
  }
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
    </div>
  );
}
