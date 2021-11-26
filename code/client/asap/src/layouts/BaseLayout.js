import React from 'react';
import style from './BaseLayout.module.css';
import BaseLayoutRoutes from './BaseLayoutRoutes';
import { useAsapContext } from '../services/state/AsapContextProvider';

const BaseLayout = () => {
    const { asapUser } = useAsapContext();

    return (
        <div className={style.baseLayoutContainer}>
            {/*<AsapErrorDialog />*/}
            <div className={style.headerContainer}>
                hello {asapUser?.first_name} {asapUser?.last_name}
            </div>
            <div className={style.sidebarContainer}>sidebar</div>
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
