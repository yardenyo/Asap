import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import PrivateRoute from './services/routing/PrivateRoute';
import BaseLayout from './layouts/BaseLayout';
import { useAsapContext } from './services/state/AsapContextProvider';
import apiService from './services/api/api';
import './App.css';
import useAuth from './services/auth/hooks/useAuth';

const App = () => {
    const { updateAsapUser } = useAsapContext();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            apiService.UserService.getCurrentUser().then(user => updateAsapUser({ ...user }));
        }
    }, [isAuthenticated, updateAsapUser]);

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="*"
                    exact
                    element={
                        <PrivateRoute>
                            <BaseLayout />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
