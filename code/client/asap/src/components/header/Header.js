import React from 'react'
import Logo from './logo.js'
import './Header.css'
import LogoutButton from './Logoutbutton'
import User from './user'
function Header(){
    return (
        <div className = "flex-container">
            <div className = "logo"> <Logo /> </div>
            <div className = "user"> <User /> </div>
            <div className= "logoutButton"> <LogoutButton /></div>

        </div>
    )
}

export default Header