import { UserContext } from "../../context/userContext.js";
import { useContext } from "react";

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
            <button onClick={onLogoutClick}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
