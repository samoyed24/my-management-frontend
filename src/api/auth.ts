import request from '@/api/wrapper'

export function postLogin(params: LoginData) {
    return request.post<UserStoreData>('/api/login', params)
}

export function postLogout() {
    return request.post('/api/logout')
}