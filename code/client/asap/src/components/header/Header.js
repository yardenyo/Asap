import React from 'react';
import Logo from './Logo.js';
import './Header.css';
import LogoutButton from './Logoutbutton';
import User from './User';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo">
                <Logo />
            </div>
            <div className="user">
                <User />
            </div>
            <div className="logoutButton">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Header;
