import { Outlet, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="navbar-buttons">
        <button className="nav-button" onClick={() => navigate("/home")}>HOME</button>
        <button className="nav-button" onClick={() => navigate("/Username")}>GAME</button>
        <button className="nav-button" onClick={() => navigate("/leaderboard")}>LEADERBOARD</button>
      </div>
    </div>
  );
};

export default NavBar;