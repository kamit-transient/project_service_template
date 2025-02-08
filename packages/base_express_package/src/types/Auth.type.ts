
import { Request } from 'express'

export interface IJWTPayload {

    "userId": string,
    "sessionId": string,
    "exp": number //in seconds

}


export type Role = {
    id: string;
    projectGrantId: string;
    roles: string[];
};

type ZitadelRoles = {
    [role: string]: {
        [tenantId: string]: string;
    };
};

interface ZitadelUser {
    amr: string[];
    at_hash: string;
    aud: string[];
    auth_time: number;
    azp: string;
    client_id: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    locale: string;
    name: string;
    preferred_username: string;
    roles: Role[];
    sid: string;
    sub: string;
    tenantId: string;
    tenantName: string;
    updated_at: number;
    "urn:zitadel:iam:org:id": string;
    "urn:zitadel:iam:org:project:296901278829641731:roles": ZitadelRoles;
    "urn:zitadel:iam:org:project:roles": ZitadelRoles;
    "urn:zitadel:iam:user:resourceowner:id": string;
    "urn:zitadel:iam:user:resourceowner:name": string;
    "urn:zitadel:iam:user:resourceowner:primary_domain": string;
};

export interface IUser extends ZitadelUser {

}
export interface RequestWithUser extends Request {
    user: ZitadelUser | null
    commentFilter: (comment: any) => boolean;
    jwtPayload: IJWTPayload | null
}