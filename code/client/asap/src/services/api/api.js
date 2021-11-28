import Axios from 'axios';
import { STORAGE_ASAP_AUTH_STATE } from '../storage/storage';

const $axios = Axios.create({
    baseURL: '/api/',
    headers: { 'Content-Type': 'application/json' },
});

//Example of a cross-cutting concern - client api error-handling
$axios.interceptors.response.use(
    response => response,
    error => {
        console.error('got error');
        console.error(error);

        throw error;
    }
);

const authHeader = () => {
    const state = JSON.parse(localStorage.getItem(STORAGE_ASAP_AUTH_STATE));
    return state?.token ? { Authorization: 'JWT ' + state.token } : {};
};

class AuthService {
    static login(username, password) {
        return $axios.post('auth/obtain-token/', { username, password }).then(response => response.data);
    }
}

class UserService {
    static getCurrentUser() {
        return $axios.post('users/get-current-user/', null, { headers: authHeader() }).then(response => response.data);
    }
}

class VersionService {
    static getCurrentVersion() {
        // TODO: change the url
        // return $axios
        //     .post('version/get-current-version/', '1.1.1', { headers: authHeader() })
        //     .then(response => response.data);
        return '1.1.1';
    }
}

const apiService = { AuthService, UserService, VersionService };

export default apiService;
