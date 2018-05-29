import axios from '~/api/axios';

export function getStatus() {
    return axios.get('status_page')
        .then((response) => response.data.data);
}
