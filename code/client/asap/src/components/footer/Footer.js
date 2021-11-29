import React from 'react';
import style from './Footer.module.css';
import Version from './footer/Version.js';

const Footer = () =>{
    return (
        <div className={style.footerContainer}>
           <div className={style.version}><Version /></div>
        </div>
    );
};
export default Footer;
