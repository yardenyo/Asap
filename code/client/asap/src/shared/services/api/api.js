import Axios from 'axios';

const $axios = Axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    },
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

class AuthService {
    static login(username, password) {
        return $axios.post('auth/obtain-token/', { username, password }).then(response => response.data);
    }

    static logout() {
        //TODO: localStorage.removeItem("user");
    }
}

const apiService = {
    AuthService,
};

export default apiService;
