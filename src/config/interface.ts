type custom = {
    name: string;
    given_name: string;
    family_name: string;
    nickname: string;
    email: string;
    email_verified: string;
    picture: string;
}

export interface decoded_jwt {
    aud: string[];
    email: string;
    exp: number;
    iat: number;
    nbf: number;
    iss: string;
    type: string;
    identity_nonce: string;
    custom?: custom; //custom object will only exist for authentication with Auth0
    sub: string;
    country: string;
}

export interface auth_status {
    jwt: string;
    decoded_jwt?: decoded_jwt;
    idp?: string; // Auth0 or GSuite
    is_verified: boolean;
}