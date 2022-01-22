import Axios from 'axios';
import { STORAGE_ASAP_AUTH_STATE } from '../storage/storage';

const $axios = Axios.create({
    baseURL: '/api/',
    headers: { 'Content-Type': 'application/json' },
});

const getOnBeforeRequestHandler = () => config => config;

const onRequestErrorHandler = () => error => Promise.reject(error);

const getOnResponseHandler = () => response => response;

const onResponseErrorHandler = () => error => Promise.reject(error);

$axios.interceptors.request.use(getOnBeforeRequestHandler(), onRequestErrorHandler());
$axios.interceptors.response.use(getOnResponseHandler(), onResponseErrorHandler());

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
        return $axios
            .post('version/get-current-version/', null, { headers: authHeader() })
            .then(response => response.data);
    }
}

class AppointmentService {
    static getDeptHeadAppointments() {
        return $axios.post('appointments/dept-head/', null, { headers: authHeader() }).then(response => response.data);
    }

    static getAppointment() {
        return $axios.get('appointments/get-table-data/').then(response => response.data);
    }
}

const apiService = { AuthService, UserService, AppointmentService, VersionService };

export default apiService;
