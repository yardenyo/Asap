import { useAsapContext } from '../../state/AsapContextProvider';

const useAuth = () => {
    const { asapAuth } = useAsapContext();

    const isAuthenticated = () => {
        if (!asapAuth?.token) {
            return false;
        }

        const expires = asapAuth.exp;
        const delta = new Date(expires * 1000) - new Date();
        return delta > 0;
    };

    const logout = () => {
        localStorage.removeItem('asapAuthState');
        window.location.href = '/#/login';
    };

    return { isAuthenticated, logout };
};

export default useAuth;
