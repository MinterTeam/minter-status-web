import {mainnet, testnet} from '~/api/axios';
import {MAINNET} from "~/assets/variables";

export function getStatus(type) {
    const axios = type === MAINNET ? mainnet : testnet;
    return axios.get('status_page')
        .then((response) => response.data.data);
}
