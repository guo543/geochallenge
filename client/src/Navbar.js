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
        {localStorage.getItem("userCredentials") != null && (
            <>
            {(localStorage.getItem('profilePicture') === null && JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture === "") && (
                <img
                    className="profile-picture"
                    src={require("./assets/globe.png")}
                    alt="Default"
                />
            )}
            {(localStorage.getItem('profilePicture') !== null) && (
                <img className="profile-picture" src={localStorage.getItem('profilePicture')} alt="" />
            )}
            {(localStorage.getItem('profilePicture') === null && JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture !== "") && (
                <img className="profile-picture" src={JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture} alt="" />
            )}
            <b>{JSON.parse(localStorage.getItem('userCredentials')).result.email}</b>
            </>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
