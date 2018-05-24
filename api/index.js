import axios from '~/api/axios';

export function getStatus() {
    return axios.get('status')
        .then((response) => response.data)
}
