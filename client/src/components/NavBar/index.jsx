import { UserContext } from "../../context/userContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  const { userData, setUserData } = useContext(UserContext);
  const { username, userId } = userData;
  const onLogoutClick = () => {
    setUserData({ username: "", userId: "" });
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
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/">Books</Link>
          </li>
          {username && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
