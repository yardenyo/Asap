import React from 'react';
import Logo from './logo.js';
import './Header.css';
import LogoutButton from './Logoutbutton';
import User from './user';

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
