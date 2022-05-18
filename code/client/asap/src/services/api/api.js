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

    static getDeptChairApplications() {
        return $axios.get('applications/dept-chair/', { headers: authHeader() }).then(response => response.data);
    }

    static getMemberApplication() {
        return $axios.get(`application/member/`, { headers: authHeader() }).then(response => response.data);
    }

    static getQualityDeptApplications() {
        return $axios.get(`applications/quality-dept/`, { headers: authHeader() }).then(response => response.data);
    }

    static getApplication(applicationId) {
        return $axios.get(`applications/${applicationId}/`, { headers: authHeader() }).then(response => response.data);
    }

    static getDeptCandidates() {
        return $axios.get('applications/candidates/', { headers: authHeader() }).then(response => response.data);
    }

    static getRanks() {
        return $axios.get('applications/ranks/', { headers: authHeader() }).then(response => response.data);
    }

    static _getFile(applicationId, fileId) {
        return $axios
            .get(`applications/${fileId}/${applicationId}/`, { headers: authHeader(), responseType: 'blob' })
            .then(response => response.data);
    }

    static getCv(applicationId) {
        return ApplicationService._getFile(applicationId, 'cv');
    }

    static getLetter(applicationId) {
        return ApplicationService._getFile(applicationId, 'letter');
    }

    static submitDeptHeadAppointment(applicationId, applicationData) {
        const formData = new FormData();
        Object.entries(applicationData).forEach(([key, value]) => formData.append(key, value));

        return $axios
            .post(`applications/submit-dept-head-application/${applicationId}/`, formData, {
                headers: Object.assign({ 'Content-Type': 'multipart/form-data' }, authHeader()),
            })
            .then(response => response.data);
    }

    static submitDeptMemberAppointment(applicationId, applicationData) {
        const formData = new FormData();
        Object.entries(applicationData).forEach(([key, value]) => formData.append(key, value));

        return $axios
            .post(`applications/submit-dept-member-application/${applicationId}/`, formData, {
                headers: Object.assign({ 'Content-Type': 'multipart/form-data' }, authHeader()),
            })
            .then(response => response.data);
    }

    static submitAdminAppointment(applicationId, applicationData, submission) {
        return $axios
            .post(
                `applications/submit-admin-application/${applicationId}/`,
                { ...applicationData, submission },
                { headers: authHeader() }
            )
            .then(response => response.data);
    }

    static handleApptChairAppointment(applicationId, applicationData, requiredAction) {
        return $axios
            .post(
                `applications/handle-appt-chair-application/${applicationId}/`,
                { ...applicationData, requiredAction },
                { headers: authHeader() }
            )
            .then(response => response.data);
    }

    static closeAdminAppointment(applicationId) {
        return $axios
            .get(`applications/close-admin-application/${applicationId}`, { headers: authHeader() })
            .then(response => response.data);
    }

    static get_remaining_days(candidateId) {
        return $axios
            .post(`users/profiles/getProfile/${candidateId}`, { candidateId }, { headers: authHeader() })
            .then(response => response.data);
    }

    static handleDeptHeadAppointment(applicationId, applicationData, requiredAction) {
        return $axios
            .post(
                `applications/handle-dept-head-application/${applicationId}/`,
                { ...applicationData, requiredAction },
                { headers: authHeader() }
            )
            .then(response => response.data);
    }
}

const apiService = { AuthService, ApplicationService, VersionService };

export default apiService;
