import decode from 'entity-decode';
import prettyNum from 'pretty-num';
import {MAINNET, TESTNET} from "~/assets/variables";


/**
 * @param {string|number} value
 * @return {string}
 */
export function pretty(value) {
    if (value > 0.001 || value < -0.001 || Number(value) === 0) {
        return decode(prettyNum(value, {precision: 4, rounding: 'fixed', thousandsSeparator: '&#x202F;'}));
    } else {
        return decode(prettyNum(value, {precision: 2, rounding: 'significant', thousandsSeparator: '&#x202F;'}));
    }
}

export function prettyUsd(value) {
    return decode(prettyNum(value, {precision: 2, thousandsSeparator: '&#x202F;'}));
}

export function prettyRound(value) {
    return decode(prettyNum(value, {precision: 0, thousandsSeparator: '&#x202F;'}));
}

/**
 * Ensure value to have minimum 4 decimal digits
 * @param {string|number} value
 * @return {string}
 */
export function prettyExact(value) {
    return decode(prettyNum(value, {precision: 4, rounding: 'increase', thousandsSeparator: '&#x202F;'}));
}

/**
 * Round to power
 * @param {number} value
 * @param {number} power
 * @return {number}
 */
export function round(value, power) {
    let tenPower = Math.pow(10, power);
    return Math.round(value * tenPower) / tenPower;
}

/**
 * Round up to min value (10^-power)
 * @param {number|string} value
 * @param {number} power
 * @return {number}
 */
export function roundUp(value, power = 4) {
    if (parseFloat(value) === 0) {
        return 0;
    }
    const sign = value >= 0 ? 1 : -1;
    const minValue = Math.pow(10, -power);
    return Math.max(minValue, Math.abs(value)) * sign;

}

export function getNetworkType(route) {
    return route.path.indexOf('/testnet') === 0 ? TESTNET : MAINNET;
}
