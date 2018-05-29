export const BASE_TITLE = 'Minter Status';
export const COIN_NAME = process.env.APP_ENV === 'production' ? 'BIP' : 'MNT';
export const MAINNET_URL = 'https://explorer.minter.network';
export const TESTNET_URL = 'https://testnet.explorer.minter.network';
export const CURRENT_URL = process.env.APP_ENV === 'production' ? MAINNET_URL : TESTNET_URL;
export const MAINNET_STATUS_URL = 'https://status.minter.network';
export const TESTNET_STATUS_URL = 'https://testnet.status.minter.network';
export const CURRENT_STATUS_URL = process.env.APP_ENV === 'production' ? MAINNET_STATUS_URL : TESTNET_STATUS_URL;
