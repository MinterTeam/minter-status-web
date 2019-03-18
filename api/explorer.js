import axios from 'axios';
import {EXPLORER_MAINNET_API_URL, EXPLORER_TESTNET_API_URL, NETWORK_MAINNET_CHANNEL} from "~/assets/variables";

export const mainnetExplorer = axios.create({
    baseURL: `${EXPLORER_MAINNET_API_URL}/api/v1/`,
    headers: {
        'X-Minter-Chain-Id': NETWORK_MAINNET_CHANNEL,
    },
});

export const testnetExplorer = axios.create({
    baseURL: `${EXPLORER_TESTNET_API_URL}/api/v1/`,
});
