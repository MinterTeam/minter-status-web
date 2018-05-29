import thousands from 'thousands';

export function thousandsFilter(value) {
    return decode(thousands(value, '&thinsp;'));
}

/**
 * @TODO separate module
 * from vue/src/compiler/parser/entity-decoder
 */
let decoder;
function decode(html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent;
}


/**
 * @param {number} num
 * @param {number} [precision=3]
 * @return {string}
 */
export function roundMoney(num, precision = 3) {
    let data = String(num).split(/[eE]/);
    if (data.length === 1) {
        return reducePrecision(num).toString();
    }

    let zeros = '';
    let sign = num < 0 ? '-' : '';
    let digits = data[0].replace('.', '');
    let mag = Number(data[1]) + 1;

    if (mag < 0) {
        zeros = sign + '0.';
        while (mag++) {
            zeros += '0';
        }
        return zeros + digits.replace(/^\-/,'').substr(0, precision);
    } else {
        mag -= digits.length;
        while (mag--) {
            zeros += '0';
        }
        return digits + zeros;
    }
}

/**
 * @param {number} num
 * @return {number}
 */
function reducePrecision(num) {
    if (Math.abs(num) < Math.pow(0.1, 8)) {
        return num
    } else if (Math.abs(num) < Math.pow(0.1, 5)) {
        return round(num, 8);
    } else if (Math.abs(num) < Math.pow(0.1, 3)) {
        return round(num, 6);
    } else {
        return round(num, 4);
    }
}


/**
 * @param {number} value
 * @param {number} power
 * @return {number}
 */
export function round(value, power) {
    let tenPower = Math.pow(10, power);
    return Math.round(value * tenPower) / tenPower;
}