//Das ist CHID-Page
import { useState } from "react";
export default function LoginForm({ onSubmit }) {
  //onsubmit : destructuring the onSubmit prop from the props object.
  const [formData, setFormData] = useState({ username: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(formData.username);
    }
  };
  return (
    <>
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
    </>
  );
}
