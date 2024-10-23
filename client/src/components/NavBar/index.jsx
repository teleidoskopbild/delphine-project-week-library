import { Link } from "react-router-dom";
// import "./NavBar.css";
export default function NavBar() {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/planner">Home</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
