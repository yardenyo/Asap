import React, { useMemo } from 'react';
import { Link, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAsapContext } from '../../state/AsapContextProvider';
import { getRoutesForRole } from '../routing-utils';
import PrivateRoute from '../PrivateRoute';

const routesPerRole = routesMetadataForRole =>
    routesMetadataForRole.map(({ id, path, Component }) => (
        <Route
            key={id}
            path={path}
            element={
                <PrivateRoute>
                    <Component />
                </PrivateRoute>
            }
        />
    ));

const linksPerRole = routesMetadataForRole =>
    routesMetadataForRole.map(({ id, path, i18nKey }) => (
        <div key={id}>
            <Link to={path}>
                <FormattedMessage id={i18nKey} />
            </Link>
        </div>
    ));

const useRouting = () => {
    const {
        asapUser: { roles },
    } = useAsapContext();

    const primaryRole = roles && roles[0];
    const routesMetadataForRole = useMemo(() => getRoutesForRole(primaryRole), [primaryRole]);

    const routes = useMemo(() => routesPerRole(routesMetadataForRole), [routesMetadataForRole]);
    const links = useMemo(() => linksPerRole(routesMetadataForRole), [routesMetadataForRole]);
    const initialRoute = routesMetadataForRole[0]?.path;

    return { routes, links, initialRoute };
};

export default useRouting;
