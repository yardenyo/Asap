import React, { useEffect, useMemo, useState } from 'react';
import { Route } from 'react-router-dom';
import { getRoutesForRole } from '../routing-utils';
import PrivateRoute from '../PrivateRoute';
import useAuth from '../../auth/hooks/useAuth';
import apiService from '../../api/api';
import { useAsapContext } from '../../../services/state/AsapContextProvider';

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

const useRouting = () => {
    const { primaryRole } = useAuth();
    const { asapUser } = useAsapContext();
    const [array, setArray] = useState([]);
    const [application, setApplication] = useState();
    let initialRoute = '';

    const routesMetadataForRole = useMemo(() => getRoutesForRole(primaryRole), [primaryRole]);

    const routes = useMemo(() => routesPerRole(routesMetadataForRole), [routesMetadataForRole]);

    useEffect(() => {
        if (primaryRole === 'asap-dept-member') {
            apiService.ApplicationService.getMemberApplication(asapUser.id).then(response => {
                {
                    response
                        .filter(application => application.applicant.user.id === asapUser.id)
                        .map(res => {
                            setArray(res);
                            setApplication(res.id);
                        });
                }
            });
        }
    }, [routesMetadataForRole, asapUser, primaryRole, application]);

    if (array !== null && primaryRole === 'asap-dept-member') {
        console.log(application);
        initialRoute = routesMetadataForRole[2]?.path.replace(':id', application);
    } else {
        initialRoute = routesMetadataForRole[0]?.path;
    }

    return { routes, routesMetadataForRole, initialRoute };
};

export default useRouting;
