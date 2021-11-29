import React from 'react';
import Logo from './Logo.js';
import './Header.css';
import Logout from '../auth/Logout';
import HeaderUser from './HeaderUser';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo">
                <Logo />
            </div>
            <div className="user">
                <HeaderUser />
            </div>
            <div className="logoutButton">
                <Logout />
            </div>
        </div>
    );
};

export default Header;
