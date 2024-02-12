import { LoginPayload } from './../models/LoginPayload';
import { LoginForm } from "../models/LoginForm";
import { RegisterForm } from "../models/RegisterForm";
import { RegisterPayload } from './../models/RegisterPayload';
import CryptoJS from "crypto-js";

export const mapRegisterFormPayLoad = (values: RegisterForm): RegisterPayload => {
    const payload = new RegisterPayload();
    payload.firstName = values.firstName;
    payload.lastName = values.lastName;
    payload.emailId = values.email;
    payload.password = encryptPassword(values.password);
    payload.mobile = values.phoneNumber;
    payload.location = values.location;

    return payload;
}

export const mapLoginFormPayLoad = (values: LoginForm): LoginPayload => {
    const payload = new LoginPayload();
    payload.emailId = values.email;
    payload.password = encryptPassword(values.password);
    return payload;
}

export const encryptPassword = (password: string): string => {
    try {
        const key = CryptoJS.enc.Utf8.parse('WQhC69td3Fe7THz7O/X+iA==');
        const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
        const encryptedPassword = CryptoJS.AES.encrypt(password, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC, // Use CBC mode
            padding: CryptoJS.pad.Pkcs7 // Use PKCS7 padding
        }).toString();
        // Combine IV and ciphertext for storage/transmission
        const encryptedPayload = '965iubWJdBBCe5VaoIDxlQ==' + encryptedPassword;
        return encryptedPayload;
    } catch (error) {
        console.error('Error encrypting password:', error);
        return '';
    }
}

async function generateAESKey() {
    // Check if the Web Crypto API is supported
    if (!window.crypto || !window.crypto.subtle) {
        throw new Error('Web Crypto API not supported');
    }

    // Generate a random AES key
    const key = await window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256 // AES key size can be 128, 192, or 256 bits
        },
        true, // Whether the key is extractable (i.e., can be exported)
        ['encrypt', 'decrypt'] // Key usages
    );

    return key;
}

// Example usage
generateAESKey()
    .then(key => {
        console.log('Generated AES key:', key);
    })
    .catch(error => {
        console.error('Error generating AES key:', error);
    });