import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import useRouting from '../../services/routing/hooks/useRouting';
import style from './Sidebar.module.css';

const Sidebar = () => {
    const { formatMessage } = useIntl();
    const { routesMetadataForRole } = useRouting();

    const links = useMemo(
        () =>
            routesMetadataForRole.map(({ id, path, i18nKey }) => (
                <div key={id}>
                    <Link to={path}>{formatMessage({ id: i18nKey })}</Link>
                </div>
            )),
        [routesMetadataForRole, formatMessage]
    );

    return <div className={style.sidebarContainer}>{links}</div>;
};

export default Sidebar;
