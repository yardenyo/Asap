import { useAsapContext } from '../../state/AsapContextProvider';

const useAuth = () => {
    const { asapAuth } = useAsapContext();

    const hasToken = asapAuth?.token;

    const expires = asapAuth?.exp || 0;
    const delta = new Date(expires * 1000) - new Date();
    const isTokenValid = delta > 0;

    const isAuthenticated = hasToken && isTokenValid;

    const logout = () => {
        localStorage.removeItem('asapAuthState');
        window.location.href = '/#/login';
    };

    return { isAuthenticated, logout };
};

export default useAuth;
