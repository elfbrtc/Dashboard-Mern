import service from '../../instance'
import { UserRequestPayload } from './types'

export const login = async(payload: UserRequestPayload) => {
    return await service.post('api/users/login', payload)
}

export const register = async(payload: UserRequestPayload) => {
    return await service.post('api/users/register', payload)
}