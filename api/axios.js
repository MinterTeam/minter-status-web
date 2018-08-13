import axios from 'axios'
import {EXPLORER_MAINNET_URL, EXPLORER_TESTNET_URL} from "~/assets/variables";

export let mainnet = axios.create({
    baseURL: `${EXPLORER_MAINNET_URL}/api/v1/`,
});

export let testnet = axios.create({
    baseURL: `${EXPLORER_TESTNET_URL}/api/v1/`,
});
