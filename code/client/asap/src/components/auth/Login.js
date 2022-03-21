import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import apiService from '../../services/api/api';
import { useAsapContext } from '../../services/state/AsapContextProvider';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import style from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateAsapAuth } = useAsapContext();
    const [credentials, setCredentials] = useState({ username: '', password: '', showPassword: false });
    const { formatMessage } = useIntl();
    const [loginError, setLoginError] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleChange = prop => event => setCredentials({ ...credentials, [prop]: event.target.value });

    const handleClickShowPassword = () => setCredentials({ ...credentials, showPassword: !credentials.showPassword });

    const handleMouseDownPassword = event => event.preventDefault();

    const onSubmit = e => {
        e.preventDefault();
        apiService.AuthService.login(credentials.username, credentials.password)
            .then(data => {
                const token = data.token;
                const decodedToken = jwt_decode(token);
                updateAsapAuth({ ...decodedToken, token });
                navigate(from, { replace: true });
                setLoginError(false);
            })
            .catch(() => {
                setLoginError(true);
            });
    };

    return (
        <div className={style.loginContainer}>
            <div><LockOpenOutlinedIcon fontSize="large" /></div>
            <h1 className={style.loginHeader}>{formatMessage({ id: 'login-header.text' })}</h1>
            <form className={style.loginFormContainer} onSubmit={onSubmit}>
                <div>
                    <TextField
                        className={style.usernameTextField}
                        label={formatMessage({ id: 'login.username.placeholder' })}
                        type={'text'}
                        value={credentials.username}
                        onChange={handleChange('username')}
                    />
                </div>

                <div>
                    <TextField
                        className={style.passwordTextField}
                        label={formatMessage({ id: 'login.password.placeholder' })}
                        type={credentials.showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                {loginError ? <div className={style.errorMessage}>{formatMessage({ id: 'errorMessage.message' })}</div> : null}
                <div>
                    <Button onClick={onSubmit} type={'submit'} variant="contained">
                        {formatMessage({ id: 'login.submit' })}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
