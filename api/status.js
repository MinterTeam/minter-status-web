import axios from 'axios';
import {STATUS_MAINNET_API_URL, STATUS_TESTNET_API_URL} from "~/assets/variables";

export const mainnetStatus = axios.create({
    baseURL: STATUS_MAINNET_API_URL,
});

export const testnetStatus = axios.create({
    baseURL: STATUS_TESTNET_API_URL,
});
