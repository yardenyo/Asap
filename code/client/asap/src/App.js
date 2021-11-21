import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import PrivateRoute from './services/routing/PrivateRoute';
import { DEFAULT_ROUTE, ROUTES } from './services/routing/routes';
import './App.css';

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
