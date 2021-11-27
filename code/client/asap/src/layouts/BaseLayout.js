import React from 'react';
import BaseLayoutRoutes from './BaseLayoutRoutes';
import Sidebar from '../components/sidebar/Sidebar';
import { useAsapContext } from '../services/state/AsapContextProvider';
import style from './BaseLayout.module.css';

const BaseLayout = () => {
    const { asapUser } = useAsapContext();

    return (
        <div className={style.baseLayoutContainer}>
            {/*<AsapErrorDialog />*/}
            <div className={style.headerContainer}>
                hello {asapUser?.first_name} {asapUser?.last_name}
            </div>
            <div className={style.sidebarContainer}>
                <Sidebar />
            </div>
            <div className={style.baseLayoutContent}>
                <main>
                    <BaseLayoutRoutes />
                </main>
            </div>
            <div className={style.footerContainer}>footer</div>
        </div>
    );
};

export default BaseLayout;
