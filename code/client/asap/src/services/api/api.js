import Axios from 'axios';
import { removeFromLocalStorage, STORAGE_ASAP_AUTH_STATE } from '../storage/storage';

const $axios = Axios.create({
    baseURL: '/api/',
    headers: { 'Content-Type': 'application/json' },
});

const getOnBeforeRequestHandler = () => config => config;

const onRequestErrorHandler = () => error => Promise.reject(error);

const getOnResponseHandler = () => response => response;

const onResponseErrorHandler = () => error => {
    if (error.response && error.response.status === 401) {
        removeFromLocalStorage(STORAGE_ASAP_AUTH_STATE);
    }

    throw error;
};

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

    static logout() {
        return $axios.post('users/logout/', null, { headers: authHeader() }).then(response => response.data);
    }

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

class ApplicationService {
    static getAdminApplications() {
        return $axios.get('applications/admin/', { headers: authHeader() }).then(response => response.data);
    }

    static getDeptHeadApplications() {
        return $axios.get('applications/dept-head/', { headers: authHeader() }).then(response => response.data);
    }

    static getApplication(currentApplicationId) {
        console.log('getApplication', currentApplicationId);
        return $axios
            .get(`appointments/${currentApplicationId}/`, { headers: authHeader() })
            .then(response => response.data);
    }

    static getDeptCandidates() {
        return $axios.get('appointments/candidates/', { headers: authHeader() }).then(response => response.data);
    }

    static getRanks() {
        return $axios.get('appointments/ranks/', { headers: authHeader() }).then(response => response.data);
    }

    static getAppointment() {
        return $axios.get('appointments/get-table-data/').then(response => response.data);
    }

    static submitAppointment(appointmentId, appointmentData) {
        const formData = new FormData();
        Object.entries(appointmentData).forEach(([key, value]) => formData.append(key, value));

        return $axios
            .post(`appointments/submit-appointment/${appointmentId}/`, formData, {
                headers: Object.assign({ 'Content-Type': 'multipart/form-data' }, authHeader()),
            })
            .then(response => response.data);
    }
}

const apiService = { AuthService, ApplicationService, VersionService };

export default apiService;
