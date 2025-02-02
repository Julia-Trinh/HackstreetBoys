import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
    return (
      <header className="app-header">
        <h1 className="app-title">
          DUMB WAYS TO TYPE
        </h1>
        <img src={logo} alt="Logo" className="app-logo" />
      </header>
    );
};

export default Header;