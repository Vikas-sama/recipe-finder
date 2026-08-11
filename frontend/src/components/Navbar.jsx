import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__mark">RF</span>
          <span>Recipe Finder</span>
        </NavLink>
        <nav className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>
            Search
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
