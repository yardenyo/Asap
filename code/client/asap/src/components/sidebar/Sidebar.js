import React from 'react';
import useRouting from '../../services/routing/hooks/useRouting';
import style from './Sidebar.module.css';

const Sidebar = () => {
    const { links } = useRouting();

    return <div className={style.sidebarContainer}>{links}</div>;
};

export default Sidebar;
