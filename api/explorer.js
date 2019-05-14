import axios from 'axios';
import {EXPLORER_MAINNET_API_URL, EXPLORER_TESTNET_API_URL} from "~/assets/variables";

export const mainnetExplorer = axios.create({
    baseURL: EXPLORER_MAINNET_API_URL,
});

export const testnetExplorer = axios.create({
    baseURL: EXPLORER_TESTNET_API_URL,
});
