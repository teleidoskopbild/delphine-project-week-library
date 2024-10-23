import { UserContext } from "../../context/userContext.js";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const { setUsername } = useContext(UserContext);
  const onLogoutClick = () => {
    setUsername(null);
  };
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">
              <button onClick={onLogoutClick}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
