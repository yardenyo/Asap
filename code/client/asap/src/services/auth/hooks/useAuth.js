import { useAsapContext } from '../../state/AsapContextProvider';
import { useNavigate } from 'react-router';
import { removeFromLocalStorage, STORAGE_ASAP_AUTH_STATE } from '../../storage/storage';

const useAuth = () => {
    const navigate = useNavigate();
    const { asapAuth } = useAsapContext();

    const hasToken = asapAuth?.token;

    const expires = asapAuth?.exp || 0;
    const delta = new Date(expires * 1000) - new Date();
    const isTokenValid = delta > 0;

    const isAuthenticated = hasToken && isTokenValid;

    const logout = () => {
        removeFromLocalStorage(STORAGE_ASAP_AUTH_STATE);
        navigate('login');
    };

    return { isAuthenticated, logout };
};

export default useAuth;
