import { UserContext } from "../../context/userContext.js";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const { setUsername, username } = useContext(UserContext);
  const onLogoutClick = () => {
    setUsername(null);
  };
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            {username ? (
              <Link to="/">
                <button onClick={onLogoutClick}>Logout</button>
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <Link to="/authors">Authors</Link>
            <Link to="/books">Books</Link>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
