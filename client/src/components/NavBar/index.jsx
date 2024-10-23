import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function NavBar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const onLogoutClick = () => {
    setUsername("");
    navigate("/", { state: username });
  };
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" onClick={onLogoutClick}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
