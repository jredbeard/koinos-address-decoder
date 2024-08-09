// simple script to decode base64 encoded Koinos address to Bitcoin-style address
// Usage: node index.js
// Enter the Base64 encoded Koinos address string when prompted
// The script will output the Bitcoin-style address
// Steps: Decode Base64, convert binary to hex, convert hex to Base58Check

const crypto = require('crypto');
const readline = require('readline');

// Base58 alphabet
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP = {};
for (let i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}

function encodeBase58(buffer) {
    let digits = [0];
    for (let i = 0; i < buffer.length; i++) {
        let carry = buffer[i];
        for (let j = 0; j < digits.length; j++) {
            carry += digits[j] << 8;
            digits[j] = carry % 58;
            carry = (carry / 58) | 0;
        }

        while (carry) {
            digits.push(carry % 58);
            carry = (carry / 58) | 0;
        }
    }

    let result = '';
    for (let k = 0; buffer[k] === 0 && k < buffer.length - 1; k++) {
        result += ALPHABET[0];
    }
    for (let q = digits.length - 1; q >= 0; q--) {
        result += ALPHABET[digits[q]];
    }
    return result;
}

// decode Base64 and convert to Bitcoin-style address
function base64ToKoinosAddress(base64String) {
    // 1: decode the Base64 string
    const binaryData = Buffer.from(base64String, 'base64');

    // 2: convert binary data to hexadecimal string
    const hexString = binaryData.toString('hex');

    // 3: convert the hexadecimal string to Buffer and encode to Base58Check
    const buffer = Buffer.from(hexString, 'hex');
    const base58Encoded = encodeBase58(buffer);

    return base58Encoded;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the Base64 encoded Koinos address string: ', (base64String) => {
    const koinosAddress = base64ToKoinosAddress(base64String);
    console.log('Koinos Address:', koinosAddress);
    rl.close();
});
