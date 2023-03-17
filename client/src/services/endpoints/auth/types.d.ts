export type UserRequestPayload = {
    username: string;
    password: string;
}

export type RegisterResponseType = {
    id: string,
    username : string,
    password : string,
    token: string

}

