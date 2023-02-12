import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="Navbar">
        <a href="/">Logout</a>
        <Link to="/registerPage">Register</Link>
        <Link to="/loginPage">Login</Link>
        <Link to="/profilePage">Profile</Link>
        <Link to="/uploadPage">Upload</Link>
        <Link to="/leaderboardPage">Leaderboard</Link>
        <Link to="/gamePage">Game</Link>
        <a href="/">Home</a>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
