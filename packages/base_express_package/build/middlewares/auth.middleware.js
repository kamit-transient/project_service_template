"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
const Exception_1 = require("../exceptions/Exception");
const jose_1 = require("jose");
const logger_1 = require("../logger/logger");
const util_1 = require("../utils/util");
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
const jwks = (0, jose_1.createRemoteJWKSet)(new URL(process.env.JWKS_URL));
async function expressAuthentication(request, securityName, scopes) {
    try {
        const token = (0, util_1.extractBearerTokenFromHeaders)(request.headers);
        const { payload } = await (0, jose_1.jwtVerify)(token, jwks, {
            issuer: process.env.AUTH_PROVDER_ENDPOINT,
            // audience:""
        });
        if (payload) {
            return Promise.resolve(payload);
        }
        else {
            return Promise.reject(new Exception_1.UnAuthenticatedException());
        }
    }
    catch (error) {
        logger_1.logger.error("error occured during token validation", error);
        throw new Exception_1.UnAuthenticatedException();
    }
}
