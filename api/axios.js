import axios from 'axios'
import {MAINNET_URL, TESTNET_URL} from "~/assets/variables";

export let mainnet = axios.create({
    baseURL: `${MAINNET_URL}/api/v1/`,
});

export let testnet = axios.create({
    baseURL: `${TESTNET_URL}/api/v1/`,
});
