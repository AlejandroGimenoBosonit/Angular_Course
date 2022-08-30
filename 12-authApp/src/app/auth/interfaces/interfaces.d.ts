export interface userLogin {
    email   : string;
    password: string;
}

export interface userRegister {
    name: string;
    email   : string;
    password: string;
}

export interface AuthResponse {
    ok       : boolean;
    uid?     : string;
    name?    : string;
    email?   : string;
    token?   : string;
    msg?     : string;
}

export interface User {
    uid     : string;
    name    : string;
    email   : string;
}