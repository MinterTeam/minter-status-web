import {mainnet, testnet} from '~/api/axios';
import {MAINNET} from "~/assets/variables";

export function getStatus(type) {
    const axios = type === MAINNET ? mainnet : testnet;
    return axios.get('status-page')
        .then((response) => ({
            ...response.data.data,
            uptime: response.data.data.uptime * 100, // fraction to percent
        }));
}

export function getWebSocketConnectData(type) {
    const axios = type === MAINNET ? mainnet : testnet;
    return axios.get('settings/get-ws-data').then((response) => ({
        ...response.data.data
    }));
}
