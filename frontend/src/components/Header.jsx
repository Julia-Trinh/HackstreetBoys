import React from 'react';
import Logo from "../components/SiteLogo.jsx";
import './Header.css';

const Header = () => {
    return (
      <header className="app-header">
        {/* <h1 className="app-title">Dumb Ways to Die</h1> */}
        <Logo className="site-logo" />
      </header>
    );
  };

export default Header;