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

export type UserResponseType = {
    _id: string,
    username : string,
    password : string,
    createdAt: string,
    updatedAt: string
}



