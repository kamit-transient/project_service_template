"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBearerTokenFromHeaders = void 0;
exports.castStringToValue = castStringToValue;
exports.getHostWithSubdomain = getHostWithSubdomain;
const Exception_1 = require("../exceptions/Exception");
function castStringToValue(input) {
    // Trim whitespace for cleaner comparison
    const trimmedInput = input?.trim();
    if (input === null || input === undefined || !trimmedInput) {
        return input; // Return null or undefined as they are
    }
    // Handle specific string cases
    if (trimmedInput === '') {
        return null; // Treat empty strings as null
    }
    if (input === 'undefined') {
        return undefined;
    }
    if (input === 'null') {
        return null;
    }
    if (input === 'true') {
        return true;
    }
    if (input === 'false') {
        return false;
    }
    if (!isNaN(Number(input))) {
        return Number(input);
    }
    return input; // Return the original string if no match
}
function getHostWithSubdomain(url) {
    if (!url) {
        throw new Exception_1.BadRequestException("Invalid url");
    }
    try {
        const parsedUrl = new URL(url);
        let host = parsedUrl.hostname;
        // Normalize `www.` to be the same as the naked domain
        if (host.startsWith("www.")) {
            host = host.slice(4); // Remove the `www.` prefix
        }
        return host;
    }
    catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}
const extractBearerTokenFromHeaders = ({ authorization }) => {
    if (!authorization) {
        throw new Error('Authorization header is missing');
    }
    if (!authorization.startsWith('Bearer')) {
        throw new Error('Authorization header is not in the Bearer scheme');
    }
    return authorization.slice(7); // The length of 'Bearer ' is 7
};
exports.extractBearerTokenFromHeaders = extractBearerTokenFromHeaders;
