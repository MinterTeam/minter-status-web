import {mainnetStatus, testnetStatus} from '~/api/status';
import {MAINNET} from "~/assets/variables";

export function getStatus(type) {
    const explorer = type === MAINNET ? mainnetStatus : testnetStatus;
    return explorer.get('status')
        .then((response) => response.data.data);
}

