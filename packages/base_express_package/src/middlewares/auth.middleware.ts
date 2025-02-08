import { ClassConstructor } from "class-transformer";
import { IValidation } from "../types/ivalidation.type";
import { UnAuthenticatedException } from "../exceptions/Exception";
import { Request } from 'express'
import { jwtVerify, createRemoteJWKSet } from 'jose';
import { logger } from "../logger/logger";
import { extractBearerTokenFromHeaders } from "../utils/util";

export interface IValidate {
    body?: { schema: ClassConstructor<IValidation>; groups?: string[] },
    query?: { schema: ClassConstructor<IValidation>; groups?: string[] },
    param?: { schema: ClassConstructor<IValidation>; groups?: string[] }
}


function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}



const jwks = createRemoteJWKSet(new URL(process.env.JWKS_URL!));

export async function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
) {

    try {
        const token = extractBearerTokenFromHeaders(request.headers);

        const { payload } = await jwtVerify(token, jwks, {
            issuer: process.env.AUTH_PROVDER_ENDPOINT!,
            // audience:""
        });

        if (payload) {
            return Promise.resolve(payload)
        } else {
            return Promise.reject(new UnAuthenticatedException())
        }

    } catch (error) {
        logger.error("error occured during token validation", error)
        throw new UnAuthenticatedException();
    }

}




