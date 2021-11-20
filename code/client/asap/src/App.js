import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './shared/components/shared/auth/Login';
import { DEFAULT_ROUTE, ROUTES } from './depl-head/services/routing/routes';
import './App.css';
import PrivateRoute from './shared/services/routing/PrivateRoute';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PrivateRoute>{DEFAULT_ROUTE.Component}</PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                {ROUTES.map(route => (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={
                            <PrivateRoute>
                                <route.Component />
                            </PrivateRoute>
                        }
                    />
                ))}
            </Routes>
        </div>
    );
}

export default App;
