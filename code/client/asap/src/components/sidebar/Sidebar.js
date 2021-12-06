import React from 'react';
import useRouting from '../../services/routing/hooks/useRouting';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import style from './Sidebar.module.css';

const Sidebar = () => {
    const { routesMetadataForRole } = useRouting();

    const links = routesMetadataForRole.map(({ id, path, i18nKey }) => (
        <Link to={path} key={id} className={style.link}>
            <Button variant="contained">
                <FormattedMessage id={i18nKey} />
            </Button>
        </Link>
    ));

    return <div className={style.sidebarContainer}>{links}</div>;
};

export default Sidebar;
