import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
    return (
      <header className="app-header">
        <h1 className="app-title">
          Dumb Ways to Die
          <img src={logo} alt="Logo" className="app-logo" />
        </h1>
      </header>
    );
};

export default Header;
