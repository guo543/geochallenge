import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("userCredentials");
    localStorage.removeItem("profilePicture");
    console.log("Logged out");
  };

  return (
    <>
      <nav className="Navbar">
        {localStorage.getItem("userCredentials") != null && (
            <>
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
                <Link to="/profilePage">Profile</Link>
                <Link to="/uploadPage">Upload</Link>
            </>
        )}
        {localStorage.getItem("userCredentials") == null && (
            <>
                <Link to="/registerPage">Register</Link>
                <Link to="/loginPage">Login</Link>
            </>
        )}
        <Link to="/leaderboardPage">Leaderboard</Link>
        <Link to="/gamePage">Game</Link>
        <a href="/">Home</a>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
